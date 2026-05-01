document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!');
    
    // ISI NAMA DAN TAGLINE
    document.getElementById('nama').textContent = 'OKAMI';
    document.getElementById('tagline').textContent = 'Video Editor | Content Creator';
    
    // Efek foto (tetap ada)
    document.getElementById('profileImg').addEventListener('click', function() {
        this.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 150);
    });
});
