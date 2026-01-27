
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes diary content for emotion, summary, and tags.
 */
export const analyzeDiaryAndMood = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `다음 일기 내용을 읽고 2026년형 싸이월드 감성으로 분석해주세요:
        1. 감성적 요약 (1문장, 따뜻한 톤)
        2. 기분 선택 (행복, 설렘, 그리움, 편안함, 외로움, 뿌듯함 중 1개와 이모지)
        3. 연관 태그 2개 (#으로 시작)
        
        일기 내용: ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            mood: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["summary", "mood", "tags"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "오늘의 소중한 조각이 저장되었습니다.",
      mood: "Thinking 💭",
      tags: ["#일상", "#기록"],
    };
  }
};

/**
 * Generates a diary draft based on user hints.
 */
export const generateDiaryDraft = async (hints: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `다음 힌트를 바탕으로 2000년대 싸이월드 감성이 담긴 2026년형 일기 초안을 한국어로 작성하세요:
        - 힌트: ${hints}
        - 조건: 1인칭 시점, 약간의 감수성, 따뜻한 어조, 200자 내외.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Draft Error:", error);
    return "기록하고 싶은 순간이 있었다... (초안 생성 실패)";
  }
};

/**
 * Generates a daily sentiment quote for the home feed.
 */
export const generateDailyQuote = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "2026년 오늘, 사용자에게 보여줄 짧고 감성적인 '오늘의 문구'를 한 줄 작성해줘. (예: 바람이 머물다 가는 자리, 우리의 추억은 선명해집니다.)",
    });
    return response.text;
  } catch (error) {
    return "당신의 오늘이 어제보다 더 따뜻한 기억으로 남기를.";
  }
};

/**
 * Generates a reconnection message for a long-lost school friend.
 */
export const generateReconnectionMessage = async (friendName: string, schoolInfo: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${schoolInfo} 졸업생인 ${friendName}님에게 20년 만에 보낼 첫 안부 메시지를 싸이월드와 아이러브스쿨 특유의 따뜻하고 그리운 감성을 담아 작성해줘.`,
    });
    return response.text;
  } catch (error) {
    return `${friendName}야, 정말 오랜만이다! 잘 지내고 있니?`;
  }
};

/**
 * Simulates AI face matching analysis results.
 */
export const analyzeFaceMatch = async (name: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${name}님과 ${context}의 유사성을 분석하는 AI 리포트 한 문장을 작성해줘. "AI 분석 결과, 20년 전 졸업앨범의 모습과 현재의 미소가 98% 일치합니다" 같은 느낌으로.`,
    });
    return response.text;
  } catch (error) {
    return "AI가 추억의 조각을 맞추는 중입니다. 당신의 소중한 인연일 가능성이 매우 높습니다.";
  }
};
