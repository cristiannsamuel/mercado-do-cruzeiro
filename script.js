const jogadores = [
  {
    nome: "Marino Hinestroza",
    posicao: "Atacante",
    origem: "Atlético Nacional ➡ Cruzeiro",
    imagem: "imagens/marinohinestroza.png",
    fonte: "@geglobo",
    link: "https://ge.globo.com/futebol/times/cruzeiro/noticia/2025/05/09/entenda-situacao-de-alvos-e-a-busca-do-cruzeiro-por-atacantes-no-mercado.ghtml",
    interesse: true,
    gostei: 0,
    naoGostei: 0
  },
  {
    nome: "Valentín Gómez",
    posicao: "Zagueiro",
    origem: "Vélez Sarsfield ➡ Cruzeiro",
    imagem: "imagens/valetingomez.png",
    fonte: "@samuelvenancio",
    link: "https://www.youtube.com/watch?v=-41QurpWN8I",
    interesse: true,
    gostei: 0,
    naoGostei: 0
  }

  // 👇 PARA ADICIONAR NOVOS JOGADORES, COPIE ESTE MODELO:
  /*
  {
    nome: "Nome do Jogador",
    posicao: "Posição",
    origem: "Clube ➡ Cruzeiro",
    imagem: "caminho/para/imagem.jpg",
    fonte: "@fonte",
    interesse: true,
    gostei: 0,
    naoGostei: 0
  }
  */
];

function renderizarJogadores(filtro = "") {
  const container = document.getElementById("jogadores-container");
  container.innerHTML = "";

  jogadores.forEach((jogador, index) => {
    if (!jogador.nome.toLowerCase().includes(filtro.toLowerCase())) return;

    const total = jogador.gostei + jogador.naoGostei;
    const pctGostei = total ? Math.round((jogador.gostei / total) * 100) : 0;
    const pctNaoGostei = 100 - pctGostei;

    const card = document.createElement("div");
    card.className = "jogador-horizontal";
    card.setAttribute("data-posicao", jogador.posicao);

    card.innerHTML = `
      <div class="foto">
        <img src="${jogador.imagem}" alt="${jogador.nome}">
      </div>
      <div class="info">
        <h3 class="nome-jogador">${jogador.nome}</h3>
        <p>${jogador.posicao}</p>
        <p>${jogador.origem}</p>
        ${jogador.interesse ? '<span class="status">INTERESSE</span>' : ""}
        <p class="fonte">
        <a href="${jogador.link}" target="_blank" rel="noopener noreferrer">${jogador.fonte}</a>
        </p>
      </div>
      <div class="aprovacao">
        <button onclick="votar(${index}, 'gostei')">👍</button>
        <button onclick="votar(${index}, 'naoGostei')">👎</button>
        <p>👍 <span class="gostei">${pctGostei}</span>% 👎 <span class="naoGostei">${pctNaoGostei}</span>%</p>
      </div>
    `;

    container.appendChild(card);
  });
}

function votar(index, tipo) {
  const votoKey = `voto_${index}`;
  if (localStorage.getItem(votoKey)) {
    alert("Você já votou neste jogador.");
    return;
  }

  if (tipo === 'gostei') {
    jogadores[index].gostei++;
  } else {
    jogadores[index].naoGostei++;
  }

  localStorage.setItem(votoKey, tipo);
  renderizarJogadores(document.getElementById("pesquisa").value);
}

function filtrarJogadores() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const posicaoSelecionada = document.getElementById("filtroPosicao").value;
  const container = document.getElementById("containerJogadores");

  container.innerHTML = "";

  jogadores.forEach((jogador, index) => {
    const nomeInclui = jogador.nome.toLowerCase().includes(termo);
    const posicaoBate = !posicaoSelecionada || jogador.posicao === posicaoSelecionada;

    if (nomeInclui && posicaoBate) {
      const total = jogador.gostei + jogador.naoGostei;
      const porcentagemGostei = total > 0 ? Math.round((jogador.gostei / total) * 100) : 0;
      const porcentagemNaoGostei = 100 - porcentagemGostei;

      const card = document.createElement("div");
      card.className = "card-jogador";

      card.innerHTML = `
        <img src="${jogador.imagem}" alt="${jogador.nome}" />
        <div class="card-conteudo">
          <h3>${jogador.nome}</h3>
          <p>${jogador.posicao}</p>
          <p>${jogador.origem}</p>
          ${jogador.interesse ? '<button>INTERESSE</button>' : ""}
          <p class="fonte"><a href="${jogador.link}" target="_blank">${jogador.fonte}</a></p>
          <div class="aprovacao">
            <button onclick="votar(${index}, 'gostei')">👍</button>
            <button onclick="votar(${index}, 'naoGostei')">👎</button>
            <p>👍 ${porcentagemGostei}% 👎 ${porcentagemNaoGostei}%</p>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  });
}

window.onload = () => {
  renderizarJogadores();
};
