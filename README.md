# TotalKey Netlify starter

This is a starter site for the three Cuty.io checkpoint links. It includes a small Netlify Function so you can confirm the backend deploys.

## Deploy to Netlify

1. Upload these files to the root of your GitHub repository (`totalkey`). Keep the folder layout exactly as shown.
2. In Netlify, choose **Add new project / Import an existing project**, select GitHub, authorize it, then choose `totalkey`.
3. Build settings should be detected from `netlify.toml`. If Netlify asks, publish directory is `public`; functions directory is `netlify/functions`. No build command is needed.
4. Deploy the site. Open the Netlify URL and check that it loads and says `Backend status: online`.

## Important security limitation

This starter intentionally does **not** generate or validate real keys. Merely clicking or visiting Cuty.io links is not reliable proof that a user completed the checkpoints. Before turning on key issuing, confirm whether your Cuty.io account supports a completion callback/postback or a verification API, and implement that verification server-side. Do not put secret API tokens in `public/` or commit them to GitHub. Store secrets in Netlify environment variables instead.

The intended key format can be `Totals-XXXXXX-XXXXXX`, but the format alone is not authentication. A real validator must check the issued key server-side and enforce the 24-hour expiry.
