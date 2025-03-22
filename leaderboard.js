// js/leaderboard.js
const Leaderboard = {
    load: () => JSON.parse(localStorage.getItem('challengeLeaderboard')) || [],
    save: (entry) => {
      const board = Leaderboard.load();
      board.push(entry);
      board.sort((a, b) => b.score - a.score);
      localStorage.setItem('challengeLeaderboard', JSON.stringify(board.slice(0, 10))); // Top 10
    },
    render: () => {
      const board = Leaderboard.load();
      return `
        <h3>Command Leaderboard</h3>
        ${board.map((e, i) => `<p>${i + 1}. ${e.name} - ${e.score} (${e.date})</p>`).join('')}
      `;
    }
  };
  
  export default Leaderboard;