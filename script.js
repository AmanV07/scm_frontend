document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("signup-role").value; // Get selected role

    fetch("http://localhost:8000/signup", { // Replace with your FastAPI backend URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role // Include role in the request body
        })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/dashboard.html";
        } else {
            response.json().then(data => {
                document.getElementById("error-msg").innerText = data.detail;
            });
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// // Redirect to login page when clicking on "Already signed in?" button
// document.getElementById("login-btn").addEventListener("click", function() {
//     window.location.href = "/login.html";
// });

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to dashboard page after successful login
            window.location.href = "/dashboard.html";
        } else {
            response.json().then(data => {
                document.getElementById("error-msg").innerText = data.detail;
            });
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

function logout() {
    fetch("http://localhost:8000/logout", { // Replace with your FastAPI backend URL
        method: "GET"
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/";
        } else {
            console.error("Logout failed");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
