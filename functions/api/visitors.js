export async function onRequestGet(context) {
  // Mock data - 실제로는 D1 Database에서 조회
  const visitors = [
    { id: 1, name: '김친구', visitedAt: '2026-02-07 14:30', message: '반가워요!' },
    { id: 2, name: '이동창', visitedAt: '2026-02-07 12:15', message: '추억 남기고 갑니다' },
    { id: 3, name: '박싸이', visitedAt: '2026-02-06 18:45' },
    { id: 4, name: '최미니', visitedAt: '2026-02-06 16:20', message: '오랜만이야!' },
    { id: 5, name: '정사이', visitedAt: '2026-02-06 10:00' },
  ];
  
  return new Response(JSON.stringify(visitors), {
    headers: { 'Content-Type': 'application/json' }
  });
}
