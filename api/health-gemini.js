export const config={runtime:'edge'};
export default async function handler(){const ok=!!process.env.GEMINI_API_KEY;
 return new Response(JSON.stringify({ok,hasGeminiKey:ok}),{status:200});}