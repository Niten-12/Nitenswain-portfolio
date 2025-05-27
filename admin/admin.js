document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error");

  // Dummy credentials
  const validUsername = "admin";
  const validPassword = "12345";

  if (username === validUsername && password === validPassword) {
    // Redirect to dashboard
    window.location.href = "admindashboard.html";
  } else {
    errorMsg.textContent = "Invalid credentials. Try again!";
  }
});
