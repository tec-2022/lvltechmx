const toggle=document.getElementById('ai-chat-toggle');
const panel=document.getElementById('ai-chat-panel');
const log=document.getElementById('ai-chat-log');
const form=document.getElementById('ai-chat-form');
const input=document.getElementById('ai-chat-input');

toggle.addEventListener('click',()=>{panel.classList.toggle('hidden');});
form.addEventListener('submit',async e=>{
 e.preventDefault();
 const msg=input.value.trim(); if(!msg)return;
 log.innerHTML+=`<div><b>Tú:</b> ${msg}</div>`; input.value='';
 log.innerHTML+=`<div>LVL TECH: escribiendo...</div>`;
 try{
   const res=await fetch('/api/gemini',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});
   const data=await res.json();
   log.innerHTML+=`<div><b>Bot:</b> ${data.reply||'Sin respuesta'}</div>`;
 }catch(err){ log.innerHTML+=`<div>Error de conexión</div>`;}
});