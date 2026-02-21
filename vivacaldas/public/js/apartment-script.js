function initImageGallery(){let e=document.querySelectorAll(".thumbnail");document.getElementById("mainImage"),e.forEach(e=>{e.addEventListener("click",function(){changeMainImage(this)})})}function changeMainImage(e){let t=document.getElementById("mainImage"),a=document.querySelectorAll(".thumbnail");a.forEach(e=>e.classList.remove("active")),e.classList.add("active"),t.src=e.src.replace("height=100&width=150","height=400&width=600"),t.alt=e.alt,t.style.opacity="0",setTimeout(()=>{t.style.opacity="1"},150)}function initBookingForm(){let e=document.querySelector(".booking-form");e&&e.addEventListener("submit",function(e){e.preventDefault(),handleBookingSubmission(this)})}function handleBookingSubmission(e){let t=new FormData(e),a=Object.fromEntries(t);if(!a.checkin||!a.checkout||!a.guests){alert("Por favor, preencha todos os campos obrigat\xf3rios.");return}let n=new Date(a.checkin),r=new Date(a.checkout),i=new Date;if(i.setHours(0,0,0,0),n<i){alert("A data de check-in n\xe3o pode ser anterior a hoje.");return}if(r<=n){alert("A data de check-out deve ser posterior à data de check-in.");return}fetch(`/vivacaldas/public/php/verificar_reserva.php?apartamento=${encodeURIComponent(a.apartamento)}&checkin=${encodeURIComponent(a.checkin)}&checkout=${encodeURIComponent(a.checkout)}`).then(async e=>{if(!e.ok)throw Error("Falha na requisição");let t=await e.text();if(!t.trim())throw Error("Resposta vazia do servidor");return JSON.parse(t)}).then(e=>{let t=document.getElementById("mensagemRetorno");if(!t)return;if(e.erro){t.innerHTML=`<span style="color: red;">${e.erro}</span>`;let n=encodeURIComponent(`Ol\xe1! Gostaria de reservar o apartamento ${a.apartamento} entre ${a.checkin} e ${a.checkout}. Poderia me ajudar?`),r=`https://wa.me/556199712260?text=${n}`;t.innerHTML+=`<br><a href="${r}" target="_blank" class="btn-whatsapp">Falar no WhatsApp</a>`,scrollToElement(t);return}let i=e.filter(e=>"dispon\xedvel"!==e.status);if(i.length>0){let o=i.map(e=>e.data).join(", ");t.innerHTML=`<span style="color: red;">🚫 Datas indisponíveis: ${o}</span>`,scrollToElement(t);return}let l=e.reduce((e,t)=>e+t.valor,0),c=e.length;document.getElementById("valorDiaria").textContent=(c?l/c:0).toFixed(2).replace(".",","),document.getElementById("valorTotal").textContent=l.toFixed(2).replace(".",","),t.innerHTML=`<span style="color: green;">✅ Reserva dispon\xedvel para ${c} di\xe1ria(s).</span>`}).catch(e=>{console.error("Erro ao processar reserva:",e),alert("Erro ao verificar disponibilidade e valores. Tente novamente.")})}function initDateValidation(){let e=document.getElementById("checkin"),t=document.getElementById("checkout");if(e&&t){let a=new Date().toISOString().split("T")[0];e.min=a,e.addEventListener("change",function(){let e=new Date(this.value);e.setDate(e.getDate()+1),t.min=e.toISOString().split("T")[0],t.value&&new Date(t.value)<=new Date(this.value)&&(t.value=""),updatePriceDisplay()}),t.addEventListener("change",()=>{updatePriceDisplay()})}}function initPriceCalculation(){let e=document.getElementById("guests");e&&e.addEventListener("change",updatePriceDisplay)}function updatePriceDisplay(){let e=document.getElementById("checkin"),t=document.getElementById("checkout"),a=document.querySelector("input[name='apartamento']");e&&t&&a&&(e.value&&t.value&&new Date(t.value)>new Date(e.value)?fetch(`/vivacaldas/public/php/verificar_reserva.php?apartamento=${encodeURIComponent(a.value)}&checkin=${encodeURIComponent(e.value)}&checkout=${encodeURIComponent(t.value)}`).then(async e=>{if(!e.ok)throw Error("Erro no fetch");let t=await e.text();if(!t.trim())throw Error("JSON vazio");return JSON.parse(t)}).then(e=>{let t=document.getElementById("valorDiaria"),a=document.getElementById("valorTotal");if(e.erro)t.textContent="N/A",a.textContent="N/A";else{let n=e.filter(e=>"disponível"===e.status);if(n.length===e.length&&n.length>0){let r=n.reduce((e,t)=>e+t.valor,0),i=r/n.length;t.textContent=i.toFixed(2).replace(".",","),a.textContent=r.toFixed(2).replace(".",",")}else t.textContent="N/D",a.textContent="N/D"}}).catch(e=>{console.error("Erro ao buscar preços:",e),document.getElementById("valorDiaria").textContent="Erro",document.getElementById("valorTotal").textContent="Erro"}):(document.getElementById("valorDiaria").textContent="N/A",document.getElementById("valorTotal").textContent="N/A"))}function initLazyLoading(){let e=document.querySelectorAll("img[data-src]"),t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let a=e.target;a.src=a.dataset.src,a.classList.remove("lazy"),t.unobserve(a)}})});e.forEach(e=>t.observe(e))}function scrollToElement(e){if(e){if("scrollBehavior"in document.documentElement.style)e.scrollIntoView({behavior:"smooth",block:"start"});else{let t=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo(0,t)}}}function scrollToBooking(){let e=document.getElementById("formReserva");e&&e.scrollIntoView({behavior:"smooth",block:"start"})}document.addEventListener("DOMContentLoaded",()=>{initImageGallery(),initBookingForm(),initDateValidation(),initPriceCalculation(),initLazyLoading(),updatePriceDisplay()});
 document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".nev-star");
  const enviarBtn = document.getElementById("nevEnviar");
  const feedbackList = document.getElementById("nevFeedbackList");
  const summary = document.getElementById("nevSummary");
  let rating = 0;

  // Carrega as avaliações existentes (se houver)
  let feedbacks = JSON.parse(localStorage.getItem("nev_feedbacks")) || [];
  renderFeedbacks();

  // ===== EVENTO DAS ESTRELAS =====
  stars.forEach(star => {
    star.addEventListener("click", () => {
      rating = parseInt(star.dataset.value);
      stars.forEach(s => s.classList.remove("active"));
      for (let i = 0; i < rating; i++) stars[i].classList.add("active");
    });
  });

  // ===== BOTÃO ENVIAR =====
  enviarBtn.addEventListener("click", () => {
    const nome = document.getElementById("nevNome").value.trim() || "Anônimo";
    const comentario = document.getElementById("nevComentario").value.trim();

    if (rating === 0 || comentario === "") {
      alert("⚠️ Dê uma nota e escreva um comentário antes de enviar!");
      return;
    }

    const novoFeedback = {
      nome,
      comentario,
      nota: rating,
      data: new Date().toLocaleDateString("pt-BR"),
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(nome)}`
    };

    // Salvar
    feedbacks.unshift(novoFeedback);
    localStorage.setItem("nev_feedbacks", JSON.stringify(feedbacks));

    // Atualizar tela
    renderFeedbacks();

    // Resetar
    document.getElementById("nevComentario").value = "";
    document.getElementById("nevNome").value = "";
    stars.forEach(s => s.classList.remove("active"));
    rating = 0;
  });

  // ===== RENDERIZAR FEEDBACKS =====
  function renderFeedbacks() {
    feedbackList.innerHTML = "";

    if (feedbacks.length === 0) {
      feedbackList.innerHTML = `<p class="nev-placeholder">Ainda não há avaliações 😢</p>`;
      summary.innerHTML = `<h3>⭐ 0.0 / 5</h3><p>Nenhuma avaliação ainda</p>`;
      return;
    }

    let total = feedbacks.reduce((acc, f) => acc + f.nota, 0);
    let media = (total / feedbacks.length).toFixed(1);

    summary.innerHTML = `
      <h3>⭐ ${media} / 5</h3>
      <p>Baseado em ${feedbacks.length} ${feedbacks.length === 1 ? "avaliação" : "avaliações"}</p>
    `;

    feedbacks.forEach(fb => {
      const card = document.createElement("div");
      card.classList.add("nev-card");

      card.innerHTML = `
        <img class="nev-avatar" src="${fb.avatar}" alt="Avatar">
        <div class="nev-card-content">
          <div class="nev-card-header">
            <span class="nev-name">${fb.nome}</span>
            <span class="nev-stars-display">${"★".repeat(fb.nota)}${"☆".repeat(5 - fb.nota)}</span>
          </div>
          <p class="nev-comment">${fb.comentario}</p>
          <span class="nev-date">${fb.data}</span>
        </div>
      `;

      feedbackList.appendChild(card);
    });
  }
});
console.log("Dashboard JS carregado com sucesso!");