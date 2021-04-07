window.addEventListener("load", renderizaElementos());

function hamburguerMenu() {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");

  if (nav.style.display === "flex") {
    nav.style.display = "none";
    header.style.minHeight = "12vh";
  } else {
    nav.style.display = "flex";
    header.style.minHeight = "65vh";
  }
}

function escondeMenuMobile() {
  const larguraTela = screen.width;

  if (larguraTela >= 320 && larguraTela <= 420) {
    hamburguerMenu();
  }
}

function trocaImagensMobile() {
  const larguraTela = screen.width;
  const imagemPromocao = document.getElementById("img-promo");
  const imagemSobre = document.getElementById("imagem-sobre");

  if (larguraTela >= 320 && larguraTela <= 420) {
    imagemPromocao.setAttribute("src", "./img/imagem-cupom-mobile.jpg");
    imagemSobre.setAttribute("src", "./img/imagem-sobre-mobile.jpg");
  }
}

function renderizaElementos() {
  trocaImagensMobile();
  cardsCardapio();
  getPizzas();
}

async function cardsCardapio() {
  const pizzas = await getPizzas();

  const cardapioContainer = document.getElementById("cardapioContainer");

  pizzas.forEach((pizzas, index) => {
    cardapioContainer.innerHTML += `
    <div class="card-pizza">
        <img src="./img/pizzas/${pizzas.nome_imagem}.png" alt="" />
        <p class="sabor">${pizzas.nome}</p>
        <p class="ingrediente">${ingredientesToString(pizzas.ingredientes)}</p>
        <div class="button-tamanhos">
            <span id="${index}" onclick="trocaPreco(event)" class="button">P</span>
            <span id="${index}" onclick="trocaPreco(event)" class="button">M</span>
            <span id="${index}" onclick="trocaPreco(event)" class="button">G</span>
        </div>
        <p id="precoPizza${index}" class="preco">${numeroParaMoeda(
      pizzas.precos[0]
    )}</p>
    </div>
    `;
  });
}

function ingredientesToString(ingredientes) {
  return ingredientes.join(", ");
}

function numeroParaMoeda(valor) {
  return valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

async function trocaPreco(event) {
  const pizzas = await getPizzas();
  const tamanho = event.target.innerText;
  const id = event.target.id;
  const precoPizza = document.getElementById(`precoPizza${id}`);

  switch (tamanho) {
    case "P":
      precoPizza.innerText = numeroParaMoeda(pizzas[id].precos[0]);
      break;
    case "M":
      precoPizza.innerText = numeroParaMoeda(pizzas[id].precos[1]);
      break;
    case "G":
      precoPizza.innerText = numeroParaMoeda(pizzas[id].precos[2]);
      break;
  }
}

async function getPizzas() {
  const response = await fetch("https://backend-pizzaria.herokuapp.com/pizzas");
  const resultData = await response.json();
  return resultData;
}
