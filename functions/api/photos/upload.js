export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${file.name}`;

    await env.R2.put(key, file.stream(), {
      httpMetadata: { contentType: file.type }
    });

    return Response.json({
      success: true,
      url: `https://vipself.pages.dev/${key}`,
      key
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
