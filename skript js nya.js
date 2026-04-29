// Ganti teks secara dinamis
document.addEventListener('DOMContentLoaded', function() {
    // Edit nama dan tagline
    document.getElementById('nama').textContent = 'Nama Kamu';
    document.getElementById('tagline').textContent = 'Video Editor | Content Creator';
    
    // Efek klik foto profil
    document.getElementById('profileImg').addEventListener('click', function() {
        this.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 150);
    });
});