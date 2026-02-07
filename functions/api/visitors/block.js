export async function onRequestPost(context) {
  try {
    const { visitorId } = await context.request.json();
    
    // Mock DB block - 실제로는 D1 Database에 차단 목록 저장
    console.log('방문자 차단:', visitorId);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: '방문자가 차단되었습니다',
      visitorId 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
