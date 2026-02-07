export async function onRequestPost(context) {
  try {
    const { items } = await context.request.json();
    
    // Mock DB save - 실제로는 D1 Database에 저장
    console.log('레이아웃 저장:', items);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: '레이아웃이 저장되었습니다',
      items 
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
