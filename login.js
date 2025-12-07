function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', handleLogin);
    
    // Allow Enter key to submit
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    function handleLogin() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        loginError.classList.add('hidden');
        loginBtn.disabled = true;
        loginBtn.textContent = 'Verifying...';

        // Simulate network delay for security
        setTimeout(() => {
            if (email === VALID_EMAIL && password === VALID_PASSWORD) {
                // Store session token (not actual credentials)
                sessionStorage.setItem('authenticated', 'true');
                sessionStorage.setItem('loginTime', new Date().getTime());
                
                // Hide login screen
                document.getElementById('loginScreen').classList.remove('active');
                
                // Show main content
                document.getElementById('mainContent').classList.remove('hidden');
                
                // Clear inputs
                emailInput.value = '';
                passwordInput.value = '';
            } else {
                loginError.textContent = '❌ Invalid email or password. Please try again.';
                loginError.classList.remove('hidden');
                passwordInput.value = '';
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
            }
        }, 800);
    }
}

// Check if user is already authenticated
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (isAuthenticated === 'true') {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('mainContent').classList.remove('hidden');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    initializeLogin();
});
