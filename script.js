document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const response = document.getElementById('response');

    yesBtn.addEventListener('click', function() {
        response.textContent = '🎉 Yay! Happy Valentine\'s Day! 💕';
        response.style.color = '#667eea';
    });

    noBtn.addEventListener('click', function() {
        response.textContent = '😢 Maybe next time...';
        response.style.color = '#f5576c';
    });
});
