namespace Sleepypedia.DTOs;

public class TextToSpeechRequest
{
    public string? Text { get; set; }
    public string? Voice { get; set; }
    public string? Speed { get; set; }
    public string? Volume { get; set; }
}