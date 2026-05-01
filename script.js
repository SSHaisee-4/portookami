document.addEventListener('DOMContentLoaded', function() {
    console.log('OkamiPorto loaded with YouTube API!');
    
    // ISI NAMA DAN TAGLINE
    document.getElementById('nama').textContent = 'OKAMI';
    document.getElementById('tagline').textContent = 'Video Editor | Content Creator';
    
    // Efek foto profil
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
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.classList[1];
                if (filterValue === 'all' || itemCategory === filterValue) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 🔥 YOUTUBE API - FETCH JUDUL, TANGGAL, VIEWS
    fetchYouTubeData();

    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fungsi fetch data YouTube
async function fetchYouTubeData() {
    const videoItems = document.querySelectorAll('.youtube-video');
    
    videoItems.forEach(async (item) => {
        const videoId = item.getAttribute('data-video-id');
        const titleEl = item.querySelector('.video-title');
        const dateEl = item.querySelector('.upload-date');
        const viewsEl = item.querySelector('.views');
        
        try {
            // YouTube Data API v3 (Ganti YOUR_API_KEY dengan API key kamu)
            const apiKey = 'AIzaSyDq8QeJ9pKqWvZfXbKqWvZfXbKqWvZfXbK'; // ← GANTI INI!
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
            );
            
            const data = await response.json();
            if (data.items && data.items[0]) {
                const video = data.items[0];
                
                // Judul
                titleEl.textContent = video.snippet.title;
                
                // Tanggal upload
                const uploadDate = new Date(video.snippet.publishedAt);
                const now = new Date();
                const diffTime = Math.abs(now - uploadDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                dateEl.innerHTML = `<i class="fas fa-calendar"></i> ${diffDays} hari lalu`;
                
                // Views
                const views = parseInt(video.statistics.viewCount).toLocaleString();
                viewsEl.innerHTML = `<i class="fas fa-eye"></i> ${views} views`;
            }
        } catch (error) {
            console.log('Error fetching YouTube data:', error);
            // Fallback jika API error
            titleEl.textContent = 'Gameplay Epic!';
            dateEl.innerHTML = '<i class="fas fa-calendar"></i> 7 hari lalu';
            viewsEl.innerHTML = '<i class="fas fa-eye"></i> 10K views';
        }
    });
}
