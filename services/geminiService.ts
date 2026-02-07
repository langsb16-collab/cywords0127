export const analyzeDiaryAndMood = async (content: string) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "analyzeDiary", data: { content } })
    });
    const result = await response.json();
    return result.fallback || result;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "오늘의 소중한 조각이 저장되었습니다.",
      mood: "Thinking 💭",
      tags: ["#일상", "#기록"],
    };
  }
};

export const generateDiaryDraft = async (hints: string) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "generateDraft", data: { hints } })
    });
    const result = await response.json();
    return result.text || "기록하고 싶은 순간이 있었다... (초안 생성 실패)";
  } catch (error) {
    console.error("Gemini Draft Error:", error);
    return "기록하고 싶은 순간이 있었다... (초안 생성 실패)";
  }
};

export const generateDailyQuote = async () => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "dailyQuote", data: {} })
    });
    const result = await response.json();
    return result.text || "당신의 오늘이 어제보다 더 따뜻한 기억으로 남기를.";
  } catch (error) {
    return "당신의 오늘이 어제보다 더 따뜻한 기억으로 남기를.";
  }
};

export const generateReconnectionMessage = async (friendName: string, schoolInfo: string) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reconnectionMessage", data: { friendName, schoolInfo } })
    });
    const result = await response.json();
    return result.text || `${friendName}야, 정말 오랜만이다! 잘 지내고 있니?`;
  } catch (error) {
    return `${friendName}야, 정말 오랜만이다! 잘 지내고 있니?`;
  }
};

export const analyzeFaceMatch = async (name: string, context: string) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "faceMatch", data: { name, context } })
    });
    const result = await response.json();
    return result.text || "AI가 추억의 조각을 맞추는 중입니다. 당신의 소중한 인연일 가능성이 매우 높습니다.";
  } catch (error) {
    return "AI가 추억의 조각을 맞추는 중입니다. 당신의 소중한 인연일 가능성이 매우 높습니다.";
  }
};
