document.addEventListener('DOMContentLoaded', function() {
    console.log('OkamiPorto loaded with filter system!');
    
    // ISI NAMA DAN TAGLINE
    document.getElementById('nama').textContent = 'OKAMI';
    document.getElementById('tagline').textContent = 'Video Editor | Content Creator';
    
    // Efek foto profil (tetap dipertahankan)
    const profileImg = document.getElementById('profileImg');
    profileImg.addEventListener('click', function() {
        this.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 150);
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });

    // Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolioGrid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class dari semua button
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class ke button yang diklik
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.classList[1]; // class kedua adalah kategori
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    // Tampilkan item dengan animasi
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, index * 50);
                } else {
                    // Sembunyikan item
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Smooth scroll saat halaman dimuat
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
