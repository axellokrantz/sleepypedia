using System.Text.Json;
using Amazon.Polly;
using Amazon.Polly.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sleepypedia.Data;
using Sleepypedia.DTOs;
using Sleepypedia.Models;

namespace Sleepypedia.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TextToSpeechController(IAmazonPolly pollyClient, IHttpClientFactory clientFactory, ArticleContextCollection context) : ControllerBase
{
    private readonly IAmazonPolly _pollyClient = pollyClient;
    private readonly IHttpClientFactory _clientFactory = clientFactory;
    private readonly ArticleContextCollection _context = context;

    [HttpPost("convert")]
    public async Task<IActionResult> ConvertTextToSpeech(TextToSpeechRequest request)
    {
        try
        {
            var ssmlText = $"<speak><prosody rate=\"{request.Speed}\">{request.Text}</prosody></speak>";

            var synthesizeSpeechRequest = new SynthesizeSpeechRequest
            {
                Text = ssmlText,
                TextType = TextType.Ssml,
                OutputFormat = OutputFormat.Mp3,
                VoiceId = request.Voice,
                Engine = Engine.Neural
            };

            using var synthesizeSpeechResponse = await _pollyClient.SynthesizeSpeechAsync(synthesizeSpeechRequest);
            using var audioStream = synthesizeSpeechResponse.AudioStream;
            using var memoryStream = new MemoryStream();

            await audioStream.CopyToAsync(memoryStream);
            return File(memoryStream.ToArray(), "audio/mpeg");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("random-wikipedia")]
    public async Task<ActionResult> GetRandomWikipediaArticle()
    {
        try
        {
            var client = _clientFactory.CreateClient();

            var randomResponse = await client.GetAsync("https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1");
            randomResponse.EnsureSuccessStatusCode();
            var randomContent = await randomResponse.Content.ReadAsStringAsync();
            var randomJson = JsonSerializer.Deserialize<JsonElement>(randomContent);
            var pageId = randomJson.GetProperty("query").GetProperty("random")[0].GetProperty("id").GetInt32();

            var fullArticleResponse = await client.GetAsync($"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids={pageId}&explaintext=true&exsectionformat=plain");
            fullArticleResponse.EnsureSuccessStatusCode();
            var fullArticleContent = await fullArticleResponse.Content.ReadAsStringAsync();
            var fullArticleJson = JsonSerializer.Deserialize<JsonElement>(fullArticleContent);
            
            var pages = fullArticleJson.GetProperty("query").GetProperty("pages");
            var page = pages.EnumerateObject().First().Value;
            var title = page.GetProperty("title").GetString();
            var extract = page.GetProperty("extract").GetString();

            var article = new Article {Title = title, Content = extract};
            _context.Add(article);
            await _context.SaveChangesAsync();
            return Ok(article);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("articles")]
    public async Task<List<Article>> GetArticles()
    {
        return await _context.Articles.ToListAsync();
    }

    [HttpDelete("article/{id}")]
    public async Task<IActionResult> DeleteArticle(int id)
    {
        try
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound($"No article with id {id} found.");
            }
            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the article: {ex.Message}");
        }
    }
}