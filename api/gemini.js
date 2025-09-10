export const config={runtime:'edge'};
export default async function handler(req){
 try{
  const apiKey=process.env.GEMINI_API_KEY;
  if(!apiKey)return new Response(JSON.stringify({ok:false,error:'Missing GEMINI_API_KEY'}),{status:500});
  const {message}=await req.json();
  if(!message)return new Response(JSON.stringify({ok:false,error:'message required'}),{status:400});
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key='+apiKey,
   {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{role:'user',parts:[{text:message}]}]})});
  const data=await r.json();
  const reply=data?.candidates?.[0]?.content?.parts?.[0]?.text||'No pude generar respuesta.';
  return new Response(JSON.stringify({ok:true,reply}),{status:200});
 }catch(e){return new Response(JSON.stringify({ok:false,error:String(e)}),{status:500});}
}