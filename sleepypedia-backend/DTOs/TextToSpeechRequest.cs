namespace Sleepypedia.DTOs;

public class TextToSpeechRequest
{
    public string? Text { get; set; }
    public string? Voice { get; set; }
    public int Rate { get; set; }
    public int Pitch { get; set; }
}