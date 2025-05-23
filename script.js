const jogadores = [
  {
    nome: "Douglas Santos",
    posicao: "Lateral",
    origem: "Zenit ➡ Cruzeiro",
    imagem: "src/imagens/douglassantos.png",
    fonte: "@otempo",
    link: "https://www.otempo.com.br/sports/cruzeiro/2025/5/23/cruzeiro-tem-interesse-na-contratacao-de-douglas-santos-e-kaiki-pode-sair-saiba-tudo",
    status: "Rumor",
    gostei: 0,
    naoGostei: 0
  },
  {
    nome: "Kaiki Bruno",
    posicao: "Lateral",
    origem: "Cruzeiro ➡ Benfica",
    imagem: "src/imagens/kaikibruno.png",
    fonte: "@centraldatoca",
    link: "https://www.centraldatoca.com.br/mercado/2025/05/23/kaiki-do-cruzeiro-entra-na-mira-do-benfica-por/",
    status: "Rumor",
    gostei: 0,
    naoGostei: 0
  },
  {
    nome: "Marino Hinestroza",
    posicao: "Atacante",
    origem: "Atlético Nacional ➡ Cruzeiro",
    imagem: "src/imagens/marinohinestroza.png",
    fonte: "@geglobo",
    link: "https://ge.globo.com/futebol/times/cruzeiro/noticia/2025/05/09/entenda-situacao-de-alvos-e-a-busca-do-cruzeiro-por-atacantes-no-mercado.ghtml",
    status: "Interesse",
    gostei: 0,
    naoGostei: 0
  },
  {
    nome: "Valentín Gómez",
    posicao: "Zagueiro",
    origem: "Vélez Sarsfield ➡ Cruzeiro",
    imagem: "src/imagens/valetingomez.png",
    fonte: "@samuelvenancio",
    link: "https://www.youtube.com/watch?v=-41QurpWN8I",
    status: "Interesse",
    gostei: 0,
    naoGostei: 0
  }
];

function renderizarJogadores() {
  const container = document.getElementById("jogadores-container");
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const posicaoFiltro = document.getElementById("filtroPosicao").value;

  container.innerHTML = "";

  jogadores.forEach((jogador, index) => {
    const nomeInclui = jogador.nome.toLowerCase().includes(termo);
    const posicaoBate = !posicaoFiltro || jogador.posicao === posicaoFiltro;
    if (!nomeInclui || !posicaoBate) return;

    const total = jogador.gostei + jogador.naoGostei;
    const pctGostei = total ? Math.round((jogador.gostei / total) * 100) : 0;
    const pctNaoGostei = 100 - pctGostei;

    const statusClass = jogador.status ? jogador.status.toLowerCase() : "";

    const card = document.createElement("div");
    card.className = "jogador-horizontal";

    card.innerHTML = `
      <div class="foto">
        <img src="${jogador.imagem}" alt="${jogador.nome}">
      </div>
      <div class="info">
        <h3>${jogador.nome}</h3>
        <p>${jogador.posicao}</p>
        <p>${jogador.origem}</p>
        ${jogador.status ? `<span class="status ${statusClass}">${jogador.status.toUpperCase()}</span>` : ""}
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

  if (tipo === "gostei") {
    jogadores[index].gostei++;
  } else {
    jogadores[index].naoGostei++;
  }

  localStorage.setItem(votoKey, tipo);
  renderizarJogadores();
}

window.onload = renderizarJogadores;
