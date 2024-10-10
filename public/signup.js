function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const password2Input = document.getElementById("password2");

    // Reset border colors
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";
    password2Input.style.borderColor = "";

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailInput.style.borderColor = "red";
        alert("Please enter a valid email address.");
        return;
    }

    // Validate password match
    if (password !== password2) {
        passwordInput.style.borderColor = "red";
        password2Input.style.borderColor = "red";
        alert("Passwords do not match.");
        return;
    }

    // Validate password strength
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        passwordInput.style.borderColor = "red";
        password2Input.style.borderColor = "red";
        alert("Password must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters.");
        return;
    }

    // If validation passes, proceed to send data to the backend
    sendDataToBackend({ username, email, password });
}

function sendDataToBackend(userData) {
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
}