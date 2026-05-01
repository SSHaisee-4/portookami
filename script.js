document.addEventListener('DOMContentLoaded', function() {
    console.log('OkamiPorto - Zenkaiedits Style Loaded!');
    
    // Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter dengan stagger animation
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.classList[1];
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, index * 80);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
