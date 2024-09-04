using System.Text.Json;
using Amazon.Polly;
using Amazon.Polly.Model;
using Microsoft.AspNetCore.Mvc;
using Sleepypedia.DTOs;

namespace Sleepypedia.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TextToSpeechController(IAmazonPolly pollyClient, IHttpClientFactory clientFactory) : ControllerBase
{
    private readonly IAmazonPolly _pollyClient = pollyClient;
    private readonly IHttpClientFactory _clientFactory = clientFactory;

    [HttpPost("convert")]
    public async Task<IActionResult> ConvertTextToSpeech([FromBody] TextToSpeechRequest request)
    {
        try
        {
            var synthesizeSpeechRequest = new SynthesizeSpeechRequest
            {
                Text = request.Text,
                OutputFormat = OutputFormat.Mp3,
                VoiceId = VoiceId.Matthew
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
    public async Task<IActionResult> GetRandomWikipediaArticle()
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

            return Ok(new { Title = title, Content = extract });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}