function addAchievement(state, name) {
  if (!state.achievements.includes(name)) {
    state.achievements.push(name);
  }
}

function checkAchievements(state) {

  // First Entry
  if (state.logs.length === 1) {
    addAchievement(state, "First Entry");
  }

  // Streak Achievements
  if (state.streak >= 3) {
    addAchievement(state, "3 Day Streak");
  }

  if (state.streak >= 7) {
    addAchievement(state, "7 Day Streak");
  }

  // Sleep Master (sleep >= 8 for 5 days)
  const sleepDays = state.logs.filter(l => l.sleep >= 8).length;
  if (sleepDays >= 5) {
    addAchievement(state, "Sleep Master");
  }

  // Hydration Hero (water >= 8 for 5 days)
  const waterDays = state.logs.filter(l => l.water >= 8).length;
  if (waterDays >= 5) {
    addAchievement(state, "Hydration Hero");
  }

  // Fitness Starter (exercise >= 30 for 3 days)
  const exerciseDays = state.logs.filter(l => l.exercise >= 30).length;
  if (exerciseDays >= 3) {
    addAchievement(state, "Fitness Starter");
  }

}

export { checkAchievements };