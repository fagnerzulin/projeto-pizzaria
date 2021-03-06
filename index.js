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
}

function cardsCardapio() {
  const { pizzas } = criaPizzas();

  const cardapioContainer = document.getElementById("cardapioContainer");

  pizzas.forEach((pizzas, index) => {
    cardapioContainer.innerHTML += `
    <div class="card-pizza">
        <img src="./img/pizzas/${pizzas.imagem}.png" alt="" />
        <p class="sabor">${pizzas.sabor}</p>
        <p class="ingrediente">${pizzas.ingrediente}</p>
        <div class="button-tamanhos">
            <span id="${index}" onclick="trocaPreco(event)" class="button">P</span>
            <span id="${index}" onclick="trocaPreco(event)" class="button">M</span>
            <span id="${index}" onclick="trocaPreco(event)" class="button">G</span>
        </div>
        <p id="precoPizza${index}" class="preco">${numeroParaMoeda(
      pizzas.valores[0]
    )}</p>
    </div>
    `;
  });
}

function numeroParaMoeda(valor) {
  return valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function trocaPreco(event) {
  const { pizzas } = criaPizzas();
  const tamanho = event.target.innerText;
  const id = event.target.id;
  const precoPizza = document.getElementById(`precoPizza${id}`);

  switch (tamanho) {
    case "P":
      precoPizza.innerText = numeroParaMoeda(pizzas[id].valores[0]);
      break;
    case "M":
      precoPizza.innerText = numeroParaMoeda(pizzas[id].valores[1]);
      break;
    case "G":
      precoPizza.innerText = numeroParaMoeda(pizzas[id].valores[2]);
      break;
  }
}

function criaPizzas() {
  return {
    pizzas: [
      {
        sabor: "Bauru",
        ingrediente: "Mussarela, presunto, requeijão, oregano e tomate.",
        valores: [19, 29, 39],
        imagem: "pizza1",
      },
      {
        sabor: "Vegetariana",
        ingrediente:
          "Mussarela, champignon, azeitona preta, cebola, oregano e pimentão verde.",
        valores: [17, 26, 35],
        imagem: "pizza2",
      },
      {
        sabor: "Marguerita",
        ingrediente: "Mussarela, tomate, manjericão e oregano",
        valores: [19, 29, 39],
        imagem: "pizza3",
      },
      {
        sabor: "Mussarela",
        ingrediente: "Mussarela, tomate e orégano.",
        valores: [19, 29, 39],
        imagem: "pizza4",
      },
      {
        sabor: "Lombo com Catupiry",
        ingrediente: "Mussarela, lombo canadense, catupiry e orégano.",
        valores: [23, 35, 42],
        imagem: "pizza5",
      },
      {
        sabor: "Calabresa",
        ingrediente: "Mussarela, calabresa, bacon, cebola e orégano.",
        valores: [19, 29, 39],
        imagem: "pizza6",
      },
      {
        sabor: "Pepperoni",
        ingrediente: "Mussarela, pepperoni e orégano.",
        valores: [23, 35, 42],
        imagem: "pizza7",
      },
    ],
  };
}
