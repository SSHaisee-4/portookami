document.addEventListener('DOMContentLoaded', function() {
    console.log('Okami Portfolio PRO Loaded! 🎨');
    
    // ================================
    // 1. CATEGORY FILTER (BARU & UTAMA)
    // ================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Filter clicked:', btn.textContent);
            
            // Toggle active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter portfolio items
            const filter = btn.getAttribute('data-category');
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show item with stagger animation
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ================================
    // 2. FOTO PROFIL ANIMATION (UPGRADE)
    // ================================
    const profileImg = document.getElementById('profileImg');
    profileImg.addEventListener('click', function() {
        // Full 360° spin + bounce
        this.style.transform = 'scale(0.95) rotate(360deg)';
        this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1.15)';
            this.style.transition = 'transform 0.3s ease';
        }, 300);
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.4s ease';
        }, 500);
    });

    // Hover effect untuk foto
    profileImg.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    profileImg.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // ================================
    // 3. PORTFOLIO HOVER EFFECTS
    // ================================
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('hidden')) {
                item.style.transform = 'translateY(-15px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('hidden')) {
                item.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // ================================
    // 4. SOCIAL BUTTONS HOVER (BONUS)
    // ================================
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(5deg) scale(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0) scale(1)';
        });
    });

    // ================================
    // 5. HAPUS: Nama sudah hardcoded di HTML
    // ================================
    // Tidak perlu lagi:
    // document.getElementById('nama').textContent = 'OKAMI';
    // document.getElementById('tagline').textContent = 'Video Editor | Content Creator';

    console.log('All effects loaded! ✅');
});
