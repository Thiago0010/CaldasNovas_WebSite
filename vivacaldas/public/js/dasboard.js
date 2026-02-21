function toggleDropdown(){let e=document.getElementById("dropdownMenu");e.classList.toggle("show")}function toggleMobileMenu(){let e=document.querySelector("header nav ul");e?.classList.toggle("mobile-active")}function enviarWhatsApp(e){e.preventDefault();let t=document.getElementById("nome")?.value||"",n=document.getElementById("email")?.value||"",a=document.getElementById("telefone")?.value||"",l=document.getElementById("apartamento")?.value||"",o=document.getElementById("mensagem")?.value||"",r=`*Contato via site:*
👤 *Nome:* ${t}
📧 *Email:* ${n}
📱 *Telefone:* ${a}
🏢 *Apartamento de Interesse:* ${l}
📝 *Mensagem:* ${o}`,s=`https://wa.me/556199712260?text=${encodeURIComponent(r)}`;window.open(s,"_blank")}function toggleDropdown(){let e=document.getElementById("dropdownMenu");e.classList.toggle("show")}document.querySelectorAll(".carrossel-container").forEach(e=>{let t=e.querySelectorAll(".item"),n=0,a=e.querySelector(".btn-left"),l=e.querySelector(".btn-right");function o(e){0!==t.length&&(t[n].classList.remove("active"),t[n=(n+e+t.length)%t.length].classList.add("active"))}a?.addEventListener("click",()=>o(-1)),l?.addEventListener("click",()=>o(1)),setInterval(()=>o(1),5e3)}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll(".scroll-suave");e.forEach(e=>{let t=e.querySelector(".scroll-suave-items"),n=e.querySelectorAll(".controle-botao"),a=n.length,l=0,o;function r(a){if(!t)return;l=a;let o=e.offsetWidth;t.style.transform=`translateX(-${o*l}px)`,n.forEach((e,t)=>{e.classList.toggle("ativo",t===l)}),d()}function s(){let e=(l+1)%a;r(e)}function i(){o=setInterval(s,4e3)}function d(){clearInterval(o),i()}n.forEach(e=>{e.addEventListener("click",function(){let e=Number.parseInt(this.getAttribute("data-index"));isNaN(e)||r(e)})}),i(),e.addEventListener("mouseenter",()=>clearInterval(o)),e.addEventListener("mouseleave",()=>i()),window.addEventListener("resize",()=>r(l))})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll(".faq-question");e.forEach(t=>{t.addEventListener("click",function(){let t=this.nextElementSibling,n="true"===this.getAttribute("aria-expanded");e.forEach(e=>{e!==this&&(e.setAttribute("aria-expanded","false"),e.nextElementSibling?.classList.remove("active"))}),this.setAttribute("aria-expanded",(!n).toString()),t?.classList.toggle("active")})})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".contato-form");e&&e.addEventListener("submit",function(e){e.preventDefault();let t=new FormData(this),n=Object.fromEntries(t);if(!n.nome||!n.email||!n.mensagem){alert("Por favor, preencha todos os campos obrigat\xf3rios.");return}let a=this.querySelector(".btn-enviar"),l=a.textContent;a.textContent="Enviando...",a.disabled=!0,setTimeout(()=>{alert("Mensagem enviada com sucesso! Entraremos em contato em breve."),this.reset(),a.textContent=l,a.disabled=!1},2e3)})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll('header nav a[href^="#"]');e.forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();let t=this.getAttribute("href"),n=document.querySelector(t);if(n){let a=document.querySelector("header"),l=a?a.offsetHeight:0,o=n.offsetTop-l-20;window.scrollTo({top:o,behavior:"smooth"})}})})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll("img");e.forEach(e=>{e.complete?e.style.opacity="1":e.addEventListener("load",function(){this.style.opacity="1"})})}),document.addEventListener("DOMContentLoaded",()=>{let e={threshold:.1,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.style.opacity="1",e.target.style.transform="translateY(0)")})},e),n=document.querySelectorAll(".scroll-suave");n.forEach(e=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.6s ease, transform 0.6s ease",t.observe(e)})}),document.addEventListener("click",function(e){let t=document.querySelector(".dropdown-toggle"),n=document.getElementById("dropdownMenu");t.contains(e.target)||n.contains(e.target)||n.classList.remove("show")});

const form = document.getElementById("formReserva");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");
const guestsInput = document.getElementById("guests");
const guests2Input = document.getElementById("guests2");

/* Garantia de robustez: se o bloco .price-breakdown for removido pelo HTML,
   criamos elementos escondidos com os IDs esperados para que o JS não quebre.
   Assim o usuário pode remover a marcação visual sem afetar a lógica. */
if (!document.getElementById("valorDiaria")) {
    const _v = document.createElement("span");
    _v.id = "valorDiaria";
    _v.textContent = "N/A";
    _v.style.display = "none";
    form?.appendChild(_v);
}
if (!document.getElementById("valorTotal")) {
    const _v2 = document.createElement("span");
    _v2.id = "valorTotal";
    _v2.textContent = "N/A";
    _v2.style.display = "none";
    form?.appendChild(_v2);
}

const valorTotalSpan = document.getElementById("valorTotal");
const whatsappContainer = document.createElement("div");

function formatarData(e){let[t,n,a]=e.split("-");return`${a}/${n}/${t}`}function atualizarBotaoWhatsapp(){let e=nomeInput.value.trim(),t=emailInput.value.trim(),n=checkinInput.value,a=checkoutInput.value,l=guestsInput.value,o=guests2Input.value,r=valorTotalSpan.textContent,s=window.location.pathname.split("/").pop(),i="";if(s.includes("ap-64")?i="Apartamento 64":s.includes("ap-95")?i="Apartamento 95":s.includes("ap-147")?i="Apartamento 147":s.includes("ap-174")?i="Apartamento 174":s.includes("ap-315")&&(i="Apartamento 315"),e&&t&&n&&a&&""!==l&&""!==o&&"N/A"!==r){let d=`Ol\xe1, gostaria de reservar o ${i}.

Nome: ${e}
Telefone: ${t}
Check-in: ${formatarData(n)}
Check-out: ${formatarData(a)}
Hóspedes: ${l} adulto(s) e ${o} criança(s)
Valor total: R$ ${r}`,c=`https://wa.me/556199712260?text=${encodeURIComponent(d)}`;whatsappContainer.innerHTML=`
        <a href="${c}" target="_blank" class="btn-whatsapp">Confirmar via WhatsApp</a>
      `,whatsappContainer.style.display="block",setTimeout(()=>whatsappContainer.style.opacity=1,10)}else whatsappContainer.style.opacity=0,setTimeout(()=>whatsappContainer.style.display="none",300)}whatsappContainer.style.marginTop="1rem",whatsappContainer.style.display="none",whatsappContainer.style.opacity=0,whatsappContainer.style.transition="opacity 0.5s ease",form.appendChild(whatsappContainer),[nomeInput,emailInput,checkinInput,checkoutInput,guestsInput,guests2Input].forEach(e=>{e.addEventListener("input",atualizarBotaoWhatsapp)}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("open-calendar"),t=document.getElementById("calendar"),n=document.getElementById("selected-date");function a(e,a){t.innerHTML="";let l=new Date(e,a,1).getDay(),o=new Date(e,a+1,0).getDate(),r=document.createElement("div");r.classList.add("calendar-header"),r.innerText=`${["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][a]} ${e}`,t.appendChild(r);let s=document.createElement("div");s.classList.add("calendar-grid"),["D","S","T","Q","Q","S","S"].forEach(e=>{let t=document.createElement("div");t.classList.add("calendar-day-name"),t.innerText=e,s.appendChild(t)});for(let i=0;i<l;i++){let d=document.createElement("div");s.appendChild(d)}for(let c=1;c<=o;c++){let p=document.createElement("div");p.classList.add("calendar-day"),p.innerText=c,p.addEventListener("click",()=>{n.value=`${String(c).padStart(2,"0")}/${String(a+1).padStart(2,"0")}/${e}`,t.style.display="none"}),s.appendChild(p)}t.appendChild(s)}e.addEventListener("click",()=>{t.style.display="block"===t.style.display?"none":"block"});let l=new Date;a(l.getFullYear(),l.getMonth())});
 