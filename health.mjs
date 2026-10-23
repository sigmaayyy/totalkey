export default async () => {
  return Response.json({
    ok: true,
    service: "totalkey",
    keyIssuingEnabled: false,
    note: "Checkpoint verification and secure key issuance are not configured yet."
  });
};
