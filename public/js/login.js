const base_url = "http://3.111.36.8:3000/api";

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset error messages
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

    let valid = true;

    // Validate email
    const email = document.getElementById("email").value.trim();
    if (!/\S+@\S+\.\S+/.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address";
      valid = false;
    }

    // Validate password
    const password = document.getElementById("password").value;
    if (password.length < 8) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 8 characters long";
      valid = false;
    }

    if (valid) {
      // If all validations pass, you can submit the form
      const user = { email, password };

      axios
        .post(`${base_url}/user/login`, user)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          alert("User Logged In successfully!");

          window.location.href = "index.html";
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.error || "An unknown error occurred";
          alert("User Log In Failed: " + errorMessage);
        });
    }
  });
