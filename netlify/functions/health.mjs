
export default async function handler() {
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "TotalKey backend is running"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    }
  );
}
