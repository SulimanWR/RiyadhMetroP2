// Add this at the top of your file
const API_URL = 'http://localhost:8080';

// Login Form Handler
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        console.log('Attempting to login...'); // Debug log
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log('Response status:', response.status); // Debug log
        const data = await response.json();
        console.log('Response data:', data); // Debug log

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'app.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Detailed login error:', error); // More detailed error
        alert('An error occurred during login. Check console for details.');
    }
});


document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        console.log('Attempting to register...'); 
        console.log('Registration data:', { username, email, password });   

        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        console.log('Response status:', response.status); 
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Detailed registration error:', error); 
        alert('An error occurred during registration. Check console for details.');
    }
});


function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
    }
}


if (window.location.pathname.includes('app.html')) {
    checkAuth();
}