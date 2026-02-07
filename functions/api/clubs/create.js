export async function onRequestPost({ request }) {
  try {
    const { name, desc } = await request.json();

    if (!name) {
      return Response.json({ error: "모임 이름이 필요합니다" }, { status: 400 });
    }

    const club = {
      id: `club-${Date.now()}`,
      name,
      description: desc || '',
      createdAt: new Date().toISOString(),
      memberCount: 1
    };

    return Response.json(club);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
