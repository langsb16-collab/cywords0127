export async function onRequestPost({ request, env }) {
  const { action, data } = await request.json();
  
  const GEMINI_API_KEY = env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    let prompt = "";
    
    switch(action) {
      case "analyzeDiary":
        prompt = `다음 일기 내용을 읽고 2026년형 싸이월드 감성으로 분석해주세요:
1. 감성적 요약 (1문장, 따뜻한 톤)
2. 기분 선택 (행복, 설렘, 그리움, 편안함, 외로움, 뿌듯함 중 1개와 이모지)
3. 연관 태그 2개 (#으로 시작)

일기 내용: ${data.content}

JSON 형식으로만 응답: {"summary": "...", "mood": "...", "tags": ["#...", "#..."]}`;
        break;
        
      case "generateDraft":
        prompt = `다음 힌트를 바탕으로 2000년대 싸이월드 감성이 담긴 2026년형 일기 초안을 한국어로 작성하세요:
- 힌트: ${data.hints}
- 조건: 1인칭 시점, 약간의 감수성, 따뜻한 어조, 200자 내외.`;
        break;
        
      case "dailyQuote":
        prompt = "2026년 오늘, 사용자에게 보여줄 짧고 감성적인 '오늘의 문구'를 한 줄 작성해줘. (예: 바람이 머물다 가는 자리, 우리의 추억은 선명해집니다.)";
        break;
        
      case "reconnectionMessage":
        prompt = `${data.schoolInfo} 졸업생인 ${data.friendName}님에게 20년 만에 보낼 첫 안부 메시지를 싸이월드와 아이러브스쿨 특유의 따뜻하고 그리운 감성을 담아 작성해줘.`;
        break;
        
      case "faceMatch":
        prompt = `${data.name}님과 ${data.context}의 유사성을 분석하는 AI 리포트 한 문장을 작성해줘. "AI 분석 결과, 20년 전 졸업앨범의 모습과 현재의 미소가 98% 일치합니다" 같은 느낌으로.`;
        break;
        
      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    
    if (action === "analyzeDiary") {
      try {
        const parsed = JSON.parse(text);
        return new Response(JSON.stringify(parsed), {
          headers: { "Content-Type": "application/json" }
        });
      } catch {
        return new Response(JSON.stringify({
          summary: "오늘의 소중한 조각이 저장되었습니다.",
          mood: "Thinking 💭",
          tags: ["#일상", "#기록"]
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: action === "analyzeDiary" ? {
        summary: "오늘의 소중한 조각이 저장되었습니다.",
        mood: "Thinking 💭",
        tags: ["#일상", "#기록"]
      } : "당신의 오늘이 어제보다 더 따뜻한 기억으로 남기를."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
