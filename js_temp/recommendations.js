import { loadData } from "./storage.js";

function renderSuggestions() {

  const { logs, goals } = loadData();
  const list = document.getElementById("suggestionsList");

  list.innerHTML = "";

  if (logs.length === 0) {
    list.innerHTML = "<li>Add today's data to see suggestions.</li>";
    return;
  }

  const today = logs[logs.length - 1];

  let suggestions = [];

  if (today.sleep < goals.sleep) {
    suggestions.push("😴 Try to sleep more tonight to reach your sleep goal.");
  }

  if (today.water < goals.water) {
    suggestions.push("💧 Drink more water today to stay hydrated.");
  }

  if (today.exercise < goals.exercise) {
    suggestions.push("🏃 Try to exercise a few more minutes today.");
  }

  if (suggestions.length === 0) {
    list.innerHTML = "<li>🎉 Excellent! You completed all health goals today.</li>";
    return;
  }

  suggestions.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    list.appendChild(li);
  });

}

export { renderSuggestions };