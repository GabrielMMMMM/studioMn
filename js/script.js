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

  // Iniciar com o título correto
  $("#h4-cortes").addClass("active");
  // Ação ao clicar no botão de contato
  document.getElementById("call-btn").onclick = function () {
    window.open(
      "https://api.whatsapp.com/send?phone=5511919158014&text=Quero%20agendar%20meu%20hor%C3%A1rio!",
      "_blank"
    );
  };
  //filtro nos botoes
  // Seleciona todos os botões de filtro e as imagens
  const filterButtons = document.querySelectorAll(
    "#portfolio-area .filter-btn"
  );
  const images = document.querySelectorAll(".project-box");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove a classe 'active' de todos os botões
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona a classe 'active' ao botão clicado
      button.classList.add("active");

      // Aplica o filtro baseado na categoria do botão clicado
      const category = button.id.replace("-btn", ""); // Extrai a categoria do id do botão
      images.forEach((image) => {
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
$(document).ready(function () {
  const carouselInner = $("#modalCarousel .carousel-inner"); // Container do carrossel
  const modalLabel = $("#imageModalLabel"); // Título do modal

  // Imagens adicionais para o carrossel (cada grupo de imagens que será adicionado ao carrossel)
  const additionalImages = {
    cabelo1: [
      "scr/img/cabelo1ponto1.jpg",
      "scr/img/cabelo1ponto2.jpg",
      "scr/img/cabelo1ponto3.jpg",
    ],
    cabelo2: ["scr/img/cabelo2ponto1.jpg", "scr/img/cabelo2ponto2.jpg"],
    cabelo3: ["scr/img/cabelo3ponto1.jpg", "scr/img/cabelo3ponto2.jpg"],
    unha1: ["scr/img/unha1.jpg"],
    unha2: ["scr/img/unha2.jpg"],
    unha3: ["scr/img/unha3.jpg"],
  };

  // Função para carregar todas as imagens no carrossel (de todos os grupos)
  function loadCarouselImages(startGroup) {
    carouselInner.empty(); // Limpa o carrossel antes de adicionar novas imagens

    let imageCount = 0;
    let activeIndex = 0;

    // Adiciona todas as imagens de todos os grupos no carrossel
    for (let group in additionalImages) {
      const images = additionalImages[group];

      images.forEach((imgSrc, index) => {
        const imgAlt = imgSrc.split("/").pop(); // Pega o nome do arquivo para ser usado no alt

        // Se a imagem faz parte do grupo clicado, marque a posição correta como "active"
        const activeClass = group === startGroup && index === 0 ? "active" : "";

        carouselInner.append(`
          <div class="carousel-item ${activeClass}">
            <img src="${imgSrc}" class="d-block w-100" alt="${imgAlt}">
          </div>
        `);

        // Contabiliza quantas imagens estão sendo adicionadas
        if (group === startGroup && index === 0) {
          activeIndex = imageCount; // Define o índice ativo como a primeira imagem do grupo clicado
        }
        imageCount++;
      });
    }

    // Retorna o índice da primeira imagem do grupo selecionado
    return activeIndex; // Retorna o índice da primeira imagem do grupo selecionado
  }

  // Evento de clique em cada imagem da galeria
  $(".gallery-img").on("click", function () {
    const group = $(this).data("group"); // Obtém o grupo (ex: 'cabelo1', 'unha1', etc.)

    // Carrega todas as imagens no carrossel e retorna o índice da primeira imagem do grupo selecionado
    const activeIndex = loadCarouselImages(group);

    // Exibe o modal
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();

    // Atualiza o carrossel para mostrar a imagem correta
    $("#modalCarousel .carousel-item").removeClass("active");
    $("#modalCarousel .carousel-item").eq(activeIndex).addClass("active");

    // Atualiza o título com a imagem correta (remover "Galeria de Imagens" e parênteses)
    const currentIndex = activeIndex + 1; // +1 porque o índice começa do 0, mas queremos que o título comece de 1
    const totalImages = 10; // Número fixo de imagens no carrossel (10 imagens)
    modalLabel.text(`${currentIndex}/${totalImages}`); // Atualiza o título corretamente, sem "Galeria de Imagens" e sem parênteses
  });

  // Atualiza o título do modal conforme o índice da imagem no carrossel
  $("#modalCarousel").on("slid.bs.carousel", function (event) {
    const currentIndex = $(event.relatedTarget).index() + 1; // Índice atual do carrossel
    const totalImages = 10; // Número fixo de imagens no carrossel (10 imagens)
    modalLabel.text(`${currentIndex}/${totalImages}`); // Atualiza o título corretamente, sem "Galeria de Imagens" e sem parênteses
  });
});
$(".zoom-btn").click(function () {
  zoomImage(this); // Passa o botão atual como referência
});

// Função para zoom da imagem
function zoomImage(button) {
  const modalImg = document.querySelector(
    "#modalCarousel .carousel-item.active img"
  );

  if (modalImg) {
    // Alterna entre os estados de zoom
    const isZoomed = modalImg.classList.contains("zoomed");

    if (isZoomed) {
      modalImg.style.transform = "scale(1)"; // Reseta o zoom
      modalImg.classList.remove("zoomed");
      button.querySelector("i").classList.remove("fa-search-minus");
      button.querySelector("i").classList.add("fa-search-plus");
    } else {
      modalImg.style.transform = "scale(1.5)"; // Aplica o zoom
      modalImg.classList.add("zoomed");
      button.querySelector("i").classList.remove("fa-search-plus");
      button.querySelector("i").classList.add("fa-search-minus");
    }
  }
}
function toggleFullscreen() {
  const modal = document.getElementById("imageModal");
  const button = document.querySelector(
    ".toolbar-button[onclick='toggleFullscreen()']"
  ); // Localiza o botão
  const icon = button.querySelector("i"); // Localiza o ícone dentro do botão

  if (document.fullscreenElement) {
    // Sai do modo tela cheia
    document
      .exitFullscreen()
      .then(() => {
        if (icon) {
          icon.classList.remove("fa-compress"); // Remove o ícone de "sair da tela cheia"
          icon.classList.add("fa-expand"); // Adiciona o ícone de "entrar em tela cheia"
        }
      })
      .catch((err) =>
        console.error(`Erro ao sair do modo tela cheia: ${err.message}`)
      );
  } else if (modal.classList.contains("show")) {
    // Entra no modo tela cheia
    modal
      .requestFullscreen()
      .then(() => {
        if (icon) {
          icon.classList.remove("fa-expand"); // Remove o ícone de "entrar em tela cheia"
          icon.classList.add("fa-compress"); // Adiciona o ícone de "sair da tela cheia"
        }
      })
      .catch((err) =>
        console.error(`Erro ao entrar no modo tela cheia: ${err.message}`)
      );
  }
}

$(".fullscreen-btn").click(function () {
  toggleFullscreen(this); // Passa o botão como referência
});
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão de fechar pelo seletor
  const closeButton = document.querySelector(
    ".toolbar-button[data-bs-dismiss='modal']"
  );

  // Adiciona o evento de clique
  closeButton.addEventListener("click", () => {
    // Verifica se está em tela cheia
    if (document.fullscreenElement) {
      // Sai do modo tela cheia
      document.exitFullscreen().catch((err) => {
        console.error(`Erro ao sair do modo tela cheia: ${err.message}`);
      });
    }
  });
});
$(document).ready(function () {
  const carouselInner = $(".carousel-inner"); // Usando jQuery para o contêiner do carrossel
  let isMouseDown = false;
  let startX, scrollLeft;

  // Detecta quando o mouse é pressionado (botão esquerdo)
  carouselInner.on("mousedown", function (e) {
    isMouseDown = true;
    startX = e.pageX - carouselInner.offset().left;
    scrollLeft = carouselInner.scrollLeft();
    carouselInner.css("cursor", "grabbing"); // Muda para "grabbing" quando pressionado
  });

  // Detecta quando o mouse é movido (e o mouse está pressionado)
  carouselInner.on("mousemove", function (e) {
    if (!isMouseDown) return; // Se o mouse não está pressionado, não faz nada
    e.preventDefault();
    const x = e.pageX - carouselInner.offset().left; // Calcula a posição do mouse
    const walk = (x - startX) * 3; // Quanto mais alto o número, mais rápido a animação
    carouselInner.scrollLeft(scrollLeft - walk); // Move o carrossel para a esquerda ou direita
  });

  // Detecta quando o mouse é solto
  carouselInner.on("mouseup", function () {
    isMouseDown = false;
    carouselInner.css("cursor", "grab"); // Retorna para "grab" quando o mouse é solto
  });

  // Opcional: se o mouse sair da área do carrossel sem ser solto
  carouselInner.on("mouseleave", function () {
    isMouseDown = false;
    carouselInner.css("cursor", "grab"); // Retorna para "grab" se o mouse sair da área
  });
});
