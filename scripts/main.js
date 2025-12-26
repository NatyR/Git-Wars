// ===============================
// ELEMENTOS DO DOM
// ===============================
console.log('JS carregado com sucesso');

document.addEventListener('DOMContentLoaded', () => {

  const btnFight = document.getElementById('btnFight');

  const inputBlue = document.getElementById('desafianteAzul');
  const inputRed = document.getElementById('desafianteVermelho');

  const statsBlue = document.getElementById('statsBlue');
  const statsRed = document.getElementById('statsRed');

  const totalBlue = document.getElementById('totalPontosAzul');
  const totalRed = document.getElementById('totalPontosVermelho');

  const avatarBlue = document.getElementById('avatarBlue');
  const avatarRed = document.getElementById('avatarRed');

  // ===============================
  // EVENTO PRINCIPAL
  // ===============================
  btnFight.addEventListener('click', fight);

  // ===============================
  // FUNÇÃO PRINCIPAL
  // ===============================
  async function fight() {
    const blueUser = inputBlue.value.trim();
    const redUser = inputRed.value.trim();

    if (!blueUser || !redUser) {
      alert('Informe os dois usuários do GitHub!');
      return;
    }

    resetUI();
    setLoading(true);

    try {
      const [blueData, redData] = await Promise.all([
        getGitHubUser(blueUser),
        getGitHubUser(redUser)
      ]);

      const blueScore = renderPlayer(blueData, statsBlue, avatarBlue, totalBlue);
      const redScore = renderPlayer(redData, statsRed, avatarRed, totalRed);

      showWinner(blueScore, redScore);

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ===============================
  // API GITHUB
  // ===============================
  async function getGitHubUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`Usuário "${username}" não encontrado`);
    }

    return response.json();
  }

  // ===============================
  // CÁLCULO DE PONTOS
  // ===============================
  function calculateStats(user) {
    return [
      { label: 'Repositórios', value: user.public_repos, score: user.public_repos * 20 },
      { label: 'Followers', value: user.followers, score: user.followers * 10 },
      { label: 'Following', value: user.following, score: user.following * 5 },
      { label: 'Gists', value: user.public_gists, score: user.public_gists * 5 }
    ];
  }

  // ===============================
  // RENDERIZAÇÃO DO JOGADOR
  // ===============================
  function renderPlayer(user, statsContainer, avatar, totalElement) {
    const stats = calculateStats(user);
    let total = 0;

    avatar.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}" />`;

    stats.forEach(stat => {
      total += stat.score;

      const li = document.createElement('li');
      li.innerHTML = `
        <span>${stat.label} (${stat.value})</span>
        <strong>${stat.score}</strong>
      `;
      statsContainer.appendChild(li);
    });

    totalElement.textContent = `Total: ${total}`;
    return total;
  }

  // ===============================
  // RESULTADO FINAL
  // ===============================
  function showWinner(blue, red) {
    if (blue > red) {
      alert('🏆 Team Blue venceu!');
    } else if (red > blue) {
      alert('🏆 Team Red venceu!');
    } else {
      alert('⚔️ Empate!');
    }
  }

  // ===============================
  // RESET DA INTERFACE
  // ===============================
  function resetUI() {
    statsBlue.innerHTML = '';
    statsRed.innerHTML = '';

    avatarBlue.textContent = '?';
    avatarRed.textContent = '?';

    totalBlue.textContent = 'Total: 0';
    totalRed.textContent = 'Total: 0';
  }

  // ===============================
  // LOADING VISUAL
  // ===============================
  function setLoading(isLoading) {
    btnFight.disabled = isLoading;
    btnFight.textContent = isLoading ? 'Fighting...' : 'Fight';
  }

});
