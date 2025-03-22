// js/tutorial.js
export function showTutorial() {
    const modal = document.createElement('div');
    modal.className = 'tutorial-modal';
    modal.innerHTML = `
      <div class="tutorial-content">
        <h2>Mission Briefing</h2>
        <p>1. Enter your Google Ads stats.</p>
        <p>2. Earn credits and badges.</p>
        <p>3. Climb the ranks to Elite Commander!</p>
        <button id="closeTutorial">Start Mission</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeTutorial').addEventListener('click', () => modal.remove());
  }
  
  // Trigger on first visit
  if (!localStorage.getItem('tutorialSeen')) {
    showTutorial();
    localStorage.setItem('tutorialSeen', 'true');
  }