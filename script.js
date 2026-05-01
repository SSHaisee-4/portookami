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

// 🔥 FUNGSI YOUTUBE API - SUDAH DIKOREKSI
async function fetchYouTubeData() {
    const videoItems = document.querySelectorAll('.youtube-video');
    
    // FIX: Loop manual bukan forEach untuk async
    for (let i = 0; i < videoItems.length; i++) {
        const item = videoItems[i];
        const videoId = item.getAttribute('data-video-id');
        const titleEl = item.querySelector('.video-title');
        const dateEl = item.querySelector('.upload-date');
        const viewsEl = item.querySelector('.views');
        
        try {
            // GANTI API KEY INI!
            const apiKey = 'YOUR_ACTUAL_API_KEY_HERE'; // ← MASUKKAN API KEY KAMU
            
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
            );
            
            if (!response.ok) {
                throw new Error('API response not ok');
            }
            
            const data = await response.json();
            
            if (data.items && data.items[0]) {
                const video = data.items[0];
                
                // ✅ JUDUL VIDEO
                titleEl.textContent = video.snippet.title;
                
                // ✅ TANGGAL UPLOAD (format Indonesia)
                const uploadDate = new Date(video.snippet.publishedAt);
                const options = { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                };
                dateEl.innerHTML = `<i class="fas fa-calendar"></i> ${uploadDate.toLocaleDateString('id-ID', options)}`;
                
                // ✅ JUMLAH VIEWS
                const views = parseInt(video.statistics.viewCount || 0).toLocaleString();
                viewsEl.innerHTML = `<i class="fas fa-eye"></i> ${views} views`;
                
                console.log(`✅ Loaded: ${video.snippet.title}`);
            } else {
                throw new Error('Video not found');
            }
        } catch (error) {
            console.log('❌ YouTube API Error:', error);
            
            // 🎯 FALLBACK DATA (tetap keren meski API error)
            titleEl.textContent = 'FREE FIRE | HEADSHOT AUTO';
            dateEl.innerHTML = '<i class="fas fa-calendar"></i> 15 Okt 2024';
            viewsEl.innerHTML = '<i class="fas fa-eye"></i> 25.6K views';
        }
    }
}
