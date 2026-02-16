/**
 * Voice transcription helper using OpenAI Whisper API
 */
import { ENV } from "./env";

export type TranscribeOptions = {
  audioUrl: string;
  language?: string;
  prompt?: string;
};

export type WhisperSegment = {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
};

export type WhisperResponse = {
  task: "transcribe";
  language: string;
  duration: number;
  text: string;
  segments: WhisperSegment[];
};

export type TranscriptionResponse = WhisperResponse;

export type TranscriptionError = {
  error: string;
  code: "FILE_TOO_LARGE" | "INVALID_FORMAT" | "TRANSCRIPTION_FAILED" | "UPLOAD_FAILED" | "SERVICE_ERROR";
  details?: string;
};

export async function transcribeAudio(
  options: TranscribeOptions
): Promise<TranscriptionResponse | TranscriptionError> {
  try {
    if (!ENV.openaiApiKey) {
      return {
        error: "Voice transcription service is not configured",
        code: "SERVICE_ERROR",
        details: "OPENAI_API_KEY is not set",
      };
    }

    // Download audio from URL
    let audioBuffer: Buffer;
    let mimeType: string;
    try {
      const response = await fetch(options.audioUrl);
      if (!response.ok) {
        return {
          error: "Failed to download audio file",
          code: "INVALID_FORMAT",
          details: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      audioBuffer = Buffer.from(await response.arrayBuffer());
      mimeType = response.headers.get("content-type") || "audio/mpeg";

      const sizeMB = audioBuffer.length / (1024 * 1024);
      if (sizeMB > 25) {
        return {
          error: "Audio file exceeds maximum size limit",
          code: "FILE_TOO_LARGE",
          details: `File size is ${sizeMB.toFixed(2)}MB, maximum allowed is 25MB`,
        };
      }
    } catch (error) {
      return {
        error: "Failed to fetch audio file",
        code: "SERVICE_ERROR",
        details: error instanceof Error ? error.message : "Unknown error",
      };
    }

    // Create FormData for Whisper API
    const formData = new FormData();
    const ext = getFileExtension(mimeType);
    const filename = `audio.${ext}`;
    const audioBlob = new Blob([new Uint8Array(audioBuffer)], { type: mimeType });
    formData.append("file", audioBlob, filename);
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");

    const prompt =
      options.prompt ||
      (options.language
        ? `Transcribe the user's voice to text, the user's working language is ${options.language}`
        : "Transcribe the user's voice to text");
    formData.append("prompt", prompt);

    const baseUrl = ENV.openaiBaseUrl || "https://api.openai.com/v1";
    const fullUrl = `${baseUrl.replace(/\/$/, "")}/audio/transcriptions`;

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${ENV.openaiApiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return {
        error: "Transcription service request failed",
        code: "TRANSCRIPTION_FAILED",
        details: `${response.status} ${response.statusText}${errorText ? `: ${errorText}` : ""}`,
      };
    }

    const whisperResponse = (await response.json()) as WhisperResponse;

    if (!whisperResponse.text || typeof whisperResponse.text !== "string") {
      return {
        error: "Invalid transcription response",
        code: "SERVICE_ERROR",
        details: "Transcription service returned an invalid response format",
      };
    }

    return whisperResponse;
  } catch (error) {
    return {
      error: "Voice transcription failed",
      code: "SERVICE_ERROR",
      details: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

function getFileExtension(mimeType: string): string {
  const map: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/wav": "wav",
    "audio/wave": "wav",
    "audio/x-wav": "wav",
    "audio/webm": "webm",
    "audio/ogg": "ogg",
    "audio/mp4": "m4a",
    "audio/x-m4a": "m4a",
    "video/mp4": "mp4",
    "video/webm": "webm",
  };
  return map[mimeType] || "mp3";
}
