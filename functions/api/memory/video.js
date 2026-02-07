export async function onRequestPost(context) {
  try {
    const { photoKey } = await context.request.json();
    
    return new Response(JSON.stringify({ 
      success: true,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      message: '영상 복원 완료'
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
