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
            return response.json(); // Parse response JSON
        } else {
            throw new Error('Invalid credentials');
        }
    })
    .then(data => {
        // Store JWT token in local storage
        localStorage.setItem("access_token", data.access_token);
        // console.log(data.access_token)
        // Redirect to dashboard page after successful login
        window.location.href = "/dashboard.html";
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle error, such as displaying error message to the user
        document.getElementById("error-msg").innerText = "Invalid credentials";
    });
});


// function logout() {
//     // Remove JWT token from local storage
//     localStorage.removeItem("access_token");

//     fetch("http://localhost:8000/logout", { // Replace with your FastAPI backend URL
//         method: "GET"
//     })
//     .then(response => {
//         if (response.ok) {
//             window.location.href = "/index.html";
//         } else {
//             console.error("Logout failed");
//         }
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
// }
