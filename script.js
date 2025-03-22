document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('challengeForm');
  const inputConsole = document.getElementById('inputConsole');
  const resultsDashboard = document.getElementById('resultsDashboard');
  const rankElement = document.getElementById('rank');
  const timerElement = document.getElementById('timer');
  const creditsElement = document.getElementById('credits');
  let formData = null;
  let timeLeft = 60;
  let credits = 0;
  let comboMultiplier = 1;

  // Sound effects
  const creditSound = new Audio('https://www.soundjay.com/buttons/sounds/coin-01.mp3');
  const winSound = new Audio('https://www.soundjay.com/buttons/sounds/beep-01a.mp3');
  const comboSound = new Audio('https://www.soundjay.com/buttons/sounds/beep-07.mp3');

  // Timer
  const startTimer = () => {
    const timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Mission Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        timerElement.textContent = 'Mission Expired!';
      }
    }, 1000);
  };

  // Credit drop animation
  const dropCredit = (x = Math.random() * (window.innerWidth - 20)) => {
    const credit = document.createElement('div');
    credit.className = 'credit';
    credit.style.left = `${x}px`;
    document.body.appendChild(credit);
    credits += 10 * comboMultiplier;
    creditsElement.textContent = `Credits: ${credits}`;
    creditSound.play();
    setTimeout(() => credit.remove(), 2000);
  };

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
    let score = Math.round((roi / 3) + (roas * 10) + (convRate * 100));

    // Bonus and Combo Logic
    let badges = '';
    if (aov > 200) { 
      score += 15; 
      badges += '<span class="badge">High Value</span>'; 
      credits += 50; 
      comboMultiplier++; 
    }
    if (roi > 150) { 
      score += 20; 
      badges += '<span class="badge">ROI Elite</span>'; 
      credits += 75; 
      comboMultiplier++; 
    }
    if (timeLeft > 50) { 
      score += 10; 
      badges += '<span class="badge">Swift Strike</span>'; 
      credits += 25; 
      comboMultiplier++; 
    }
    if (comboMultiplier > 1) { 
      comboSound.play(); 
      badges += `<span class="badge">Combo x${comboMultiplier}</span>`; 
    }

    let rank = 'Rookie';
    let rankColor = '#778da9';
    if (score >= 150) { rank = 'Elite Commander'; rankColor = '#ff00ff'; }
    else if (score >= 100) { rank = 'Strategic Captain'; rankColor = '#00ffff'; }
    else if (score >= 50) { rank = 'Tactical Officer'; rankColor = '#ffcc00'; }

    const metrics = `
      <p ${roi > 150 ? 'class="optimized"' : ''}><span>${clicks.toFixed(0)}</span> Clicks</p>
      <p ${convRate > 0.03 ? 'class="optimized"' : ''}><span>${conversions.toFixed(0)}</span> Conversions</p>
      <p><span>$${revenue.toFixed(0)}</span> Revenue</p>
      <p ${roi > 150 ? 'class="optimized"' : ''}><span>${roi.toFixed(1)}%</span> ROI</p>
      <p ${roas > 3 ? 'class="optimized"' : ''}><span>${roas.toFixed(2)}x</span> ROAS</p>
    `;
    const leaderboard = `
      <h3>Command Leaderboard</h3>
      <p>1. EliteCmdr - 180</p>
      <p>2. StratCap - 135</p>
      <p>3. You - ${score}</p>
    `;
    const upgrades = `
      <h3>Upgrade Protocols</h3>
      <ul>
        ${roi < 100 ? '<li>Precision Targeting: +20% ROI</li>' : ''}
        ${convRate < 0.03 ? '<li>Conversion Boost: +50% Rate</li>' : ''}
        ${roas < 2 ? '<li>Ad Optimization: +30% ROAS</li>' : ''}
        <li>Free Analysis: Contact Command HQ!</li>
      </ul>
    `;
    const report = `Ad Performance Challenge Report\n\nRank: ${rank}\nScore: ${score}\nCredits Earned: ${credits}\nCombo Multiplier: x${comboMultiplier}\n\nMetrics:\n- Clicks: ${clicks.toFixed(0)}\n- Conversions: ${conversions.toFixed(0)}\n- Revenue: $${revenue.toFixed(0)}\n- ROI: ${roi.toFixed(1)}%\n- ROAS: ${roas.toFixed(2)}x\n\nBadges:${badges ? badges.replace(/<[^>]+>/g, ' ') : ' None'}\n\nUpgrades:\n${roi < 100 ? '- Precision Targeting: +20% ROI\n' : ''}${convRate < 0.03 ? '- Conversion Boost: +50% Rate\n' : ''}${roas < 2 ? '- Ad Optimization: +30% ROAS\n' : ''}- Free Analysis: Contact Command HQ!\n\nChallenge again at snapshot.winthropharrimanassociates.com!`;

    startTimer();

    inputConsole.classList.add('fade-out');
    setTimeout(() => {
      inputConsole.style.display = 'none';
      resultsDashboard.style.display = 'block';
      resultsDashboard.classList.add('fade-in');

      let currentScore = 0;
      const animateScore = setInterval(() => {
        currentScore += Math.ceil(score / 50);
        if (currentScore >= score) {
          currentScore = score;
          clearInterval(animateScore);
          winSound.play();
          if (score >= 150) {
            confetti({ particleCount: 200, spread: 100, colors: ['#ff00ff', '#00ffff'] });
          }
        }
        rankElement.textContent = `${currentScore}`;
        if (currentScore % 25 === 0 && currentScore > 0) dropCredit();
      }, 20);

      rankElement.textContent = `${rank}`;
      rankElement.style.color = rankColor;
      document.getElementById('badges').innerHTML = badges;
      document.getElementById('metrics').innerHTML = metrics;
      document.getElementById('leaderboard').innerHTML = leaderboard;
      document.getElementById('upgrades').innerHTML = upgrades;

      document.getElementById('downloadBtn').addEventListener('click', () => {
        const blob = new Blob([report], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Ad_Challenge_Report.txt';
        link.click();
        alert('Report downloaded! Check your downloads folder.');
      });

      document.getElementById('submitBtn').addEventListener('click', () => {
        const formDataObj = new FormData(form);
        fetch('https://formspree.io/f/xqappjqr', {
          method: 'POST',
          body: formDataObj,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            window.location.href = 'https://snapshot.winthropharrimanassociates.com/thanks.html';
          } else {
            alert('Submission failed. Try again or contact support!');
          }
        })
        .catch(error => {
          console.error('Submission error:', error);
          alert('Connection error. Please try again later!');
        });
      });

      document.getElementById('resetBtn').addEventListener('click', () => {
        resultsDashboard.classList.remove('fade-in');
        resultsDashboard.style.display = 'none';
        inputConsole.style.display = 'block';
        inputConsole.classList.remove('fade-out');
        form.reset();
        timeLeft = 60;
        credits = 0;
        comboMultiplier = 1;
        creditsElement.textContent = 'Credits: 0';
        timerElement.textContent = 'Mission Time: 60s';
      });
    }, 600);
  });

  // Credit chase on hover (enhanced engagement)
  document.body.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.03 && resultsDashboard.style.display === 'block') {
      dropCredit(e.clientX - 10);
    }
  });
});