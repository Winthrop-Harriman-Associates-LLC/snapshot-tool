document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('snapshotForm');
    const formPanel = document.getElementById('formPanel');
    const resultsPanel = document.getElementById('resultsPanel');
    const scoreElement = document.getElementById('score');
    let formData = null;
  
    // Sound effects
    const coinSound = new Audio('https://www.soundjay.com/buttons/sounds/coin-01.mp3');
    const winSound = new Audio('https://www.soundjay.com/buttons/sounds/beep-01a.mp3');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const spend = parseFloat(document.getElementById('spend').value);
      const cpc = parseFloat(document.getElementById('cpc').value);
      const convRate = parseFloat(document.getElementById('convRate').value) / 100;
      const cpcv = parseFloat(document.getElementById('cpcv').value);
      const aov = parseFloat(document.getElementById('aov').value);
      const email = document.getElementById('email').value;
  
      formData = { spend, cpc, convRate, cpcv, aov, email };
  
      const clicks = spend / cpc;
      const conversions = clicks * convRate;
      const revenue = conversions * aov;
      const roi = (revenue - spend) / spend * 100;
      const roas = revenue / spend;
      let score = Math.min(Math.round((roi / 3) + (roas * 10) + (convRate * 100)), 100);
      let bonus = '';
      if (aov > 200) { score += 10; bonus = 'Bonus: +10 for High AOV!'; } // Bonus points
  
      let level = 'Beginner';
      let levelColor = '#778da9';
      if (score >= 80) { level = 'Elite'; levelColor = '#ff00ff'; }
      else if (score >= 50) { level = 'Pro'; levelColor = '#00ffff'; }
  
      const metrics = `
        <p><span>${clicks.toFixed(0)}</span> Clicks</p>
        <p><span>${conversions.toFixed(0)}</span> Conversions</p>
        <p><span>$${revenue.toFixed(0)}</span> Revenue</p>
        <p><span>${roi.toFixed(1)}%</span> ROI</p>
        <p><span>${roas.toFixed(2)}x</span> ROAS</p>
      `;
      const leaderboard = `
        <h3>Leaderboard</h3>
        <p>1. PlayerX - 92</p>
        <p>2. AdMaster - 85</p>
        <p>3. You - ${score}</p>
      `;
      const powerUps = `
        <h3>Power-Ups</h3>
        <ul>
          ${roi < 100 ? '<li>Long-Tail Keywords: +20% Efficiency</li>' : ''}
          ${convRate < 0.03 ? '<li>Remarketing: +50% Conversions</li>' : ''}
          ${roas < 2 ? '<li>Ad Testing: +30% ROAS</li>' : ''}
          <li>Free Consultation: Unlock Elite Status!</li>
        </ul>
      `;
  
      formPanel.classList.add('fade-out');
      setTimeout(() => {
        formPanel.style.display = 'none';
        resultsPanel.style.display = 'block';
        resultsPanel.classList.add('fade-in');
  
        let currentScore = 0;
        const animateScore = setInterval(() => {
          currentScore += Math.ceil(score / 50);
          if (currentScore >= score) {
            currentScore = score;
            clearInterval(animateScore);
            coinSound.play();
            if (score >= 80) {
              winSound.play();
              confetti({ particleCount: 200, spread: 100, colors: ['#ff00ff', '#00ffff'] });
            }
          }
          scoreElement.textContent = currentScore;
        }, 20);
  
        document.getElementById('level').textContent = `Level: ${level}`;
        document.getElementById('level').style.color = levelColor;
        document.getElementById('bonus').textContent = bonus;
        document.getElementById('metrics').innerHTML = metrics;
        document.getElementById('leaderboard').innerHTML = leaderboard;
        document.getElementById('powerUps').innerHTML = powerUps;
  
        document.getElementById('downloadBtn').addEventListener('click', () => {
          const shareText = `I scored ${score} in the Ad Performance Arcade! Beat me at snapshot.winthropharrimanassociates.com!`;
          alert(`Scorecard sent to ${email}! Share your score: ${shareText}`);
        });
  
        document.getElementById('submitBtn').addEventListener('click', () => {
          form.submit(); // Trigger Formspree submission
        });
  
        document.getElementById('resetBtn').addEventListener('click', () => {
          resultsPanel.classList.remove('fade-in');
          resultsPanel.style.display = 'none';
          formPanel.style.display = 'block';
          formPanel.classList.remove('fade-out');
          form.reset();
        });
      }, 600);
    });
  });