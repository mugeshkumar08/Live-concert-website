document.addEventListener("DOMContentLoaded", () => {
    // Initialize EmailJS with your public key (if you're using it)
    emailjs.init("R5EiOBTOvg3H19Uaf");  // Replace with your public key from EmailJS

    const loginForm = document.querySelector(".login");
    const signupForm = document.querySelector(".register");
    const forgotPasswordForm = document.querySelector(".forgot-password");
    const resetPasswordForm = document.querySelector(".reset-password");

    const forgotPasswordBtn = document.querySelector(".forget-pass");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

    let generatedOTP = '';  // Store the generated OTP

    // Switch between forms
    registerLink.addEventListener("click", () => {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
    });

    loginLink.addEventListener("click", () => {
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
    });

    forgotPasswordBtn.addEventListener("click", () => {
        loginForm.classList.remove("active");
        forgotPasswordForm.classList.add("active");
    });

    // Handle Forgot Password form submission (Send OTP)
    document.getElementById("forgot-password-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("forgot-password-email").value;

        // Check if email exists in localStorage
        const userData = JSON.parse(localStorage.getItem(email));

        if (userData) {
            generatedOTP = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random OTP

            // Send OTP via EmailJS
            emailjs.send("service_4kmn3ic", "template_wfy4p8g", {
                to_email: email,
                otp: generatedOTP
            }).then(() => {
                alert(`OTP sent to your email: ${email}`);
                // Move to Reset Password form
                forgotPasswordForm.classList.remove("active");
                resetPasswordForm.classList.add("active");
            }).catch((error) => {
                alert("Failed to send OTP. Please try again.");
                console.error("Error sending email: ", error);
            });
        } else {
            alert("User not found!");
        }
    });

    // Handle Reset Password form submission
    document.getElementById("reset-password-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const otp = document.getElementById("otp-input").value;
        const newPassword = document.getElementById("new-password").value;
        const email = document.getElementById("forgot-password-email").value;

        if (otp === generatedOTP) {
            const userData = JSON.parse(localStorage.getItem(email));
            if (userData) {
                userData.password = newPassword;
                localStorage.setItem(email, JSON.stringify(userData));
                alert("Password reset successfully! You can now log in.");

                // Switch back to login form
                resetPasswordForm.classList.remove("active");
                loginForm.classList.add("active");
            } else {
                alert("Error updating password.");
            }
        } else {
            alert("Invalid OTP! Please try again.");
        }
    });

    // Handle Signup form submission
    document.getElementById("signup-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const username = document.getElementById("signup-username").value;

        if (localStorage.getItem(email)) {
            alert("User already exists! Please log in.");
        } else {
            const userData = { username, email, password };
            localStorage.setItem(email, JSON.stringify(userData));
            alert("Signup successful! Redirecting to user dashboard...");

            // Redirect to user page after successful signup
            window.location.href = 'user.html';  // Replace 'user.html' with your user page
        }
    });

    // Handle Login form submission
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const userData = JSON.parse(localStorage.getItem(email));

        if (userData && userData.password === password) {
            alert("Login successful! Redirecting to user dashboard...");

            // Redirect to user page after successful login
            window.location.href = 'user.html';  // Replace 'user.html' with your user page
        } else {
            alert("Invalid email or password! Please try again.");
        }
    });
});






function submitForm(event) {
    event.preventDefault(); 

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const formData = {
        name: name,
        email: email,
        message: message
    };

    let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    submissions.push(formData);

    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    alert('Form submitted successfully!');

    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
}

