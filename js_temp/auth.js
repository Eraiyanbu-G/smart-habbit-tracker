/* ===== USERS ===== */

function getUsers() {
  return JSON.parse(
    localStorage.getItem("users")
  ) || [];
}

/* ===== SAVE USERS ===== */

function saveUsers(users) {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
}

/* ===== SIGNUP ===== */

const signupForm =
  document.getElementById("signupForm");

if (signupForm) {

  signupForm.addEventListener("submit", e => {

    e.preventDefault();

    const name =
      document.getElementById("signupName").value;

    const email =
      document.getElementById("signupEmail").value;

    const password =
      document.getElementById("signupPassword").value;

    const users = getUsers();

    const alreadyExists =
      users.some(u => u.email === email);

    if (alreadyExists) {
      alert("User already exists");
      return;
    }

    users.push({
      name,
      email,
      password
    });

    saveUsers(users);

    alert("Signup successful");

    window.location.href = "index.html";
  });

}

/* ===== LOGIN ===== */

const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", e => {

    e.preventDefault();

    const email =
      document.getElementById("loginEmail").value;

    const password =
      document.getElementById("loginPassword").value;

    const users = getUsers();

    const validUser = users.find(
      u =>
        u.email === email &&
        u.password === password
    );

    if (!validUser) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(validUser)
    );

    alert("Login successful");

    window.location.href = "dashboard.html";
  });

}

/* ===== PROTECT DASHBOARD ===== */

if (
  window.location.pathname.includes("dashboard.html")
) {

  const currentUser =
    JSON.parse(
      localStorage.getItem("currentUser")
    );

  if (!currentUser) {
    window.location.href = "index.html";
  }

}

/* ===== LOGOUT ===== */

const logoutBtn =
  document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {
    console.log("Logout clicked");
    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

  });

}