export async function POST(request) {
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return Response.json(
      { ok: false, message: 'ADMIN_PASSWORD belum diset di environment variables.' },
      { status: 500 }
    );
  }

  if (password === correctPassword) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, message: 'Password salah.' }, { status: 401 });
}
