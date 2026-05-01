document.addEventListener('DOMContentLoaded', function() {
    console.log('Okami Portfolio Loaded!');
    
    // Hanya foto effect
    document.getElementById('profileImg').addEventListener('click', function() {
        this.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        }, 150);
    });
});
