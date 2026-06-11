import { loadData, saveData } from "./storage.js";
import { addXP, updateStreak } from "./stats.js";
import { checkAchievements } from "./achievements.js";

import {
  renderHeader,
  renderWeeklySummary,
  renderAchievements,
  setupTheme,
  renderGoalProgress
} from "./ui.js";

import {
  renderSleepChart,
  renderWaterChart,
  renderExerciseChart
} from "./charts.js";

import { exportCSV } from "./export.js";
import { renderSuggestions } from "./recommendations.js";

function init() {
  setupTheme();
  renderAll();
  setupTodayForm();
  setupExport();
  setupReset();
}

function renderAll() {
  renderHeader();
  renderWeeklySummary();
  renderAchievements();

  renderSleepChart();
  renderWaterChart();
  renderExerciseChart();

  renderSuggestions();
  renderGoalProgress();
}

function setupExport() {
  document
    .getElementById("exportBtn")
    .addEventListener("click", exportCSV);
}

function setupReset() {
  document
    .getElementById("resetData")
    .addEventListener("click", () => {

      if (confirm("Delete all saved data?")) {
        localStorage.removeItem("lifeStats");
        location.reload();
      }

    });
}

function setupTodayForm() {

  const form = document.getElementById("dailyForm");

  form.addEventListener("submit", e => {

    e.preventDefault();

    const state = loadData();

    const sleep = Number(
      document.getElementById("sleepInput").value
    );

    const water = Number(
      document.getElementById("waterInput").value
    );

    const exercise = Number(
      document.getElementById("exerciseInput").value
    );

    const today = new Date()
      .toISOString()
      .split("T")[0];

    // prevent duplicate day entry
    if (state.logs.some(l => l.date === today)) {
      alert("Today's data already exists");
      return;
    }

    const entry = {
      date: today,
      sleep,
      water,
      exercise
    };

    state.logs.push(entry);

    updateStreak(state, today);

    addXP(state);

    applyGoalBonus(state, entry);

    checkAchievements(state);

    saveData(state);

    renderAll();

    form.reset();

  });

}

function applyGoalBonus(state, entry) {

  const { goals } = state;

  let bonus = 0;

  if (entry.sleep >= goals.sleep) bonus += 5;

  if (entry.water >= goals.water) bonus += 5;

  if (entry.exercise >= goals.exercise) bonus += 5;

  state.xp += bonus;

}

init();