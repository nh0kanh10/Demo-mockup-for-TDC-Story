import { GoogleGenAI, Type, Modality } from "@google/genai";

// This is a placeholder. In a real app, this would be a secure environment variable.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const getAiClient = () => {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }
    return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateComicPanels = async (chapterText: string, additionalPrompt?: string): Promise<string[]> => {
  console.log("Generating comic panels for text:", chapterText.substring(0, 50) + "...");
  try {
    const ai = getAiClient();
    const imageUrls: string[] = [];
    const textChunks: string[] = [];
    const BATCH_SIZE = 4;
    const CHUNK_SIZE = 500;

    for (let i = 0; i < BATCH_SIZE; i++) {
        const start = i * CHUNK_SIZE;
        const end = start + CHUNK_SIZE;
        const chunk = chapterText.substring(start, end);
        if (chunk) {
            textChunks.push(chunk);
        }
    }
    
    if(textChunks.length === 0 && chapterText) {
        textChunks.push(chapterText);
    }
    
    const generationPromises = textChunks.map(chunk => {
      let prompt = `Generate a single comic book panel in a modern manga style that visually represents the following scene. The panel should be vibrant, dynamic, and focus on the key actions or emotions. Scene: "${chunk}..."`;
      if (additionalPrompt) {
        prompt += `\nAdditional instructions from the author: "${additionalPrompt}"`;
      }
      return ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });
    });

    const responses = await Promise.all(generationPromises);

    for (const response of responses) {
        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
            imageUrls.push(imageUrl);
        }
    }

    if (imageUrls.length === 0) {
      throw new Error("AI did not generate any images.");
    }

    return imageUrls;
  } catch (error) {
    console.error("Error generating comic panels:", error);
    return [
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+1+(Error)',
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+2+(Error)',
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+3+(Error)',
      'https://placehold.co/500x700/0c0a09/6b7280?text=Panel+4+(Error)',
    ];
  }
};

export const generateShortClip = async (chapterText: string, additionalPrompt?: string): Promise<string> => {
    console.log("Generating video clip for text:", chapterText.substring(0, 50) + "...");
    try {
        const ai = getAiClient();
        let prompt = `Create a short, cinematic, animated video clip based on this scene: "${chapterText.substring(0, 500)}...". Focus on a key moment of action or emotion.`;
        if (additionalPrompt) {
          prompt += `\nAdditional instructions from the author: "${additionalPrompt}"`;
        }
        
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }
        
        const videoBlob = await fetchVideoStream(downloadLink);
        return URL.createObjectURL(videoBlob);

    } catch(error) {
        console.error("Error generating short clip:", error);
        return 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-magical-forest-34107-large.mp4';
    }
};

export const generateSpeech = async (text: string): Promise<string> => {
    console.log("Generating speech for text:", text.substring(0, 30) + "...");
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Hãy đọc đoạn văn sau một cách truyền cảm: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data returned from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating speech:", error);
        throw error;
    }
};

export const analyzeAmbientSound = async (text: string): Promise<string> => {
    console.log("Analyzing ambient sound for text:", text.substring(0, 50) + "...");
    try {
        const ai = getAiClient();
        const prompt = `Dựa vào đoạn văn sau, hãy mô tả âm thanh môi trường phù hợp nhất trong 3-5 từ (ví dụ: "tiếng mưa rơi nhẹ", "lửa trại lách tách", "quán rượu ồn ào", "gió rít qua khe núi"). Chỉ trả về mô tả, không thêm bất cứ lời giải thích nào.\n\nĐoạn văn: "${text}"`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch(error) {
         console.error("Error analyzing ambient sound:", error);
        return "Không thể phân tích âm thanh.";
    }
};

export const checkVideoStatus = async (operation: any) => {
    const ai = getAiClient();
    const updatedOperation = await ai.operations.getVideosOperation({ operation });
    return updatedOperation;
};

export const fetchVideoStream = async(uri: string) => {
    if (!API_KEY) {
        throw new Error("API Key is required to fetch video stream");
    }
    const response = await fetch(`${uri}&key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch video stream');
    }
    return response.blob();
};
