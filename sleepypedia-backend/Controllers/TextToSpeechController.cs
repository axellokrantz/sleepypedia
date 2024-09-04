using Amazon.Polly;
using Amazon.Polly.Model;
using Microsoft.AspNetCore.Mvc;
using Sleepypedia.DTOs;

namespace Sleepypedia.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TextToSpeechController(IAmazonPolly pollyClient) : ControllerBase
{
    private readonly IAmazonPolly _pollyClient = pollyClient;

    [HttpPost]
    public async Task<IActionResult> ConvertTextToSpeech([FromBody] TextToSpeechRequest request)
    {
        try
        {
            var synthesizeSpeechRequest = new SynthesizeSpeechRequest
            {
                Text = request.Text,
                OutputFormat = OutputFormat.Mp3,
                VoiceId = VoiceId.Joanna
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
}