// js/profiles.js
const Profiles = {
    load: () => {
      return JSON.parse(localStorage.getItem('challengeProfiles')) || {};
    },
    save: (email, data) => {
      const profiles = Profiles.load();
      profiles[email] = { ...profiles[email], ...data, lastPlayed: new Date().toISOString() };
      localStorage.setItem('challengeProfiles', JSON.stringify(profiles));
    },
    getUser: (email) => Profiles.load()[email] || { highScore: 0, totalCredits: 0, missions: 0 }
  };
  
  export default Profiles;