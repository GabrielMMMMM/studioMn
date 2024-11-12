$(document).ready(function () {
  let navBtn = $(".nav-item");

  let bannerSection = $("#mainSlider");
  let aboutSection = $("#about-area");
  let servicesSection = $("#services-area");
  let portfolioSection = $("#portfolio-area");
  let contactSection = $("#contact-area");

  let scrollTo;

  // Ação ao clicar nos botões de navegação
  $(navBtn).click(function (event) {
    event.preventDefault();
    let btnId = $(this).attr("id");

    switch (btnId) {
      case "about-menu":
        scrollTo = aboutSection;
        break;
      case "services-menu":
        scrollTo = servicesSection;
        break;
      case "portfolio-menu":
        scrollTo = portfolioSection;
        break;
      case "contact-menu":
        scrollTo = contactSection;
        break;
      default:
        scrollTo = bannerSection;
    }

    // Animacao
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(scrollTo).offset().top - 70,
      },
      1000
    );
  });

 
 

  $(".project-box img").click(function () {
    const imgSrc = $(this).attr("src");
    const images = [];

    // Adicionando imagens relacionadas ao array
    if (imgSrc.includes("cabelo1")) {
      images.push(
        "scr/img/cabelo1.jpeg",
        "scr/img/cabelo12.jpeg",
        "scr/img/cabelo3.jpeg"
      );
    } else if (imgSrc.includes("cabelo3")) {
      images.push("scr/img/cabelo3.jpeg", "scr/img/cabelo4.jpeg");
    } else if (imgSrc.includes("cabelo12")) {
      images.push("scr/img/cabelo12.jpeg", "scr/img/cabelo13.jpeg");
    } else if (imgSrc.includes("manicure1")) {
      images.push("scr/img/manicure1.png", "scr/img/manicure2.png");
    } else if (imgSrc.includes("manicure2")) {
      images.push("scr/img/manicure2.png", "scr/img/manicure3.png");
    } else if (imgSrc.includes("manicure3")) {
      images.push("scr/img/manicure3.png", "scr/img/manicure1.png");
    }

    // Limpa o carrossel antes de adicionar as novas imagens
    $("#modalCarousel .carousel-inner").empty();

    // Adiciona as imagens ao carrossel
    images.forEach((src, index) => {
      const activeClass = index === 0 ? "active" : "";
      $("#modalCarousel .carousel-inner").append(`
            <div class="carousel-item ${activeClass}">
                <img src="${src}" class="d-block w-100" alt="Imagem">
            </div>
        `);
    });

    // Mostra o modal
    $("#imageModal").modal("show");
  });

  // Função para alternar para tela cheia
  function toggleFullscreen() {
    const modal = document.getElementById("imageModal");
  
    // Verifica se está em tela cheia
    if (document.fullscreenElement) {
      // Sai do modo tela cheia
      document.exitFullscreen();
    } else if (modal.classList.contains("show")) {
      // Entra em tela cheia se o modal estiver visível
      modal.requestFullscreen().catch((err) =>
        console.error(`Erro ao entrar em tela cheia: ${err.message}`)
      );
    }
  }

  // Função para fechar o modal e sair da tela cheia
  $(".toolbar-button")
    .eq(0)
    .click(function () {
      toggleFullscreen(); // Chama a função ao clicar no botão de tela cheia
    });

  // Fechar o modal e sair da tela cheia quando o modal for fechado
  $("#imageModal").on("hidden.bs.modal", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen(); // Sair do modo tela cheia
    }
  });

  // Função para zoom da imagem
  function zoomImage() {
    const modalImg = document.querySelector(
      "#modalCarousel .carousel-item.active img"
    );
    if (modalImg) {
      if (modalImg.style.transform === "scale(1.5)") {
        modalImg.style.transform = "scale(1)";
      } else {
        modalImg.style.transform = "scale(1.5)";
      }
    }
  }

  // Eventos para os botões do modal
  $(".toolbar-button")
    .eq(0)
    .click(function () {
      toggleFullscreen();
    });

  $(".toolbar-button")
    .eq(1)
    .click(function () {
      zoomImage();
    });

  // Evento de clique para fechar o modal
  $(".toolbar-button")
    .eq(2)
    .click(function () {
      $("#imageModal").modal("hide");
    });

  // Iniciar com o título correto
  $("#h4-cortes").addClass("active");
  // Ação ao clicar no botão de contato
  document.getElementById("call-btn").onclick = function () {
    window.location.href =
      "https://api.whatsapp.com/send?phone=5511919158014&text=Quero%20agendar%20meu%20hor%C3%A1rio!";
  };

  //filtro nos botoes
 // Seleciona todos os botões de filtro e as imagens
const filterButtons = document.querySelectorAll("#portfolio-area .filter-btn");
const images = document.querySelectorAll(".project-box");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove a classe 'active' de todos os botões
    filterButtons.forEach(btn => btn.classList.remove("active"));

    // Adiciona a classe 'active' ao botão clicado
    button.classList.add("active");

    // Aplica o filtro baseado na categoria do botão clicado
    const category = button.id.replace("-btn", ""); // Extrai a categoria do id do botão
    images.forEach(image => {
      if (category === "all") {
        image.style.display = "block"; // Mostra todas as imagens
      } else if (image.classList.contains(category)) {
        image.style.display = "block"; // Mostra apenas a categoria selecionada
      } else {
        image.style.display = "none"; // Oculta outras categorias
      }
    });
  });
});

// Seleciona todos os botões de filtro

});
