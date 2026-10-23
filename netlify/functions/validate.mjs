
import { getStore } from "@netlify/blobs";
import { randomBytes } from "node:crypto";

const sessions = getStore("totalkey-sessions");
const keys = getStore("totalkey-keys");

export default async function handler(request) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const session = body.session;

  if (
    typeof session !== "string" ||
    !/^[a-f0-9]{64}$/.test(session)
  ) {
    return Response.json(
      { error: "Invalid session" },
      { status: 400 }
    );
  }

  const record = await sessions.get(session, { type: "json" });

  if (!record || record.used) {
    return Response.json(
      { error: "Session invalid or already used" },
      { status: 403 }
    );
  }

  if (Date.now() - record.startedAt < 28000) {
    return Response.json(
      { error: "Please try again later" },
      { status: 403 }
    );
  }

  const part = () =>
    randomBytes(4).toString("hex").slice(0, 6).toUpperCase();

  const key = `Totals-${part()}-${part()}`;
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

  await keys.setJSON(key, { expiresAt });
  await sessions.setJSON(session, { ...record, used: true });

  return Response.json({
    key,
    expiresAt
  });
}
