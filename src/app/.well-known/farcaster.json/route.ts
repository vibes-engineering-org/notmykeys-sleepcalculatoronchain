import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl =
    process.env.NEXT_PUBLIC_URL ||
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ",
      payload:
        "eyJkb21haW4iOiJub3RteWtleXMtc2xlZXBjYWxjdWxhdG9yb25jaGFpbi52ZXJjZWwuYXBwIn0",
      signature:
        "MHhmOGU4OTU1ODIzMzQ4ZDgzNjYwYWYzNzFhMjc1YmNiNDY2OWUxMjczYTFiNzUzY2QzYjRlMGJiNjgyZDUzMDc0NWY2NzkwMzQ0MjMxMjk0NDBkYjhiN2I5MmRjNWUwYTI5ODEyODVmMzBiODE5NjU4ZGZmZjE4Y2FiMWQwZmYwMzFi",
    },
    frame: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/og.png`,
      buttonTitle: "Open",
      webhookUrl: `${appUrl}/api/webhook`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#555555",
      primaryCategory: "health-fitness",
      tags: ["sleep", "health", "calculator", "wellness", "cycles"],
    },
  };

  return Response.json(config);
}
