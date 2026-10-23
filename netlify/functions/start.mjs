
import { getStore } from "@netlify/blobs";
import { randomBytes } from "node:crypto";

export default async function handler(request) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  const sessions = getStore("totalkey-sessions");
  const id = randomBytes(32).toString("hex");

  await sessions.setJSON(id, {
    startedAt: Date.now(),
    used: false
  });

  return Response.json({ session: id });
}
