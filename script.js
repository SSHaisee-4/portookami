document.addEventListener('DOMContentLoaded', function() {
    console.log('OkamiPorto loaded with AUTO VIDEO TITLES! 🚀');
    
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

    // === AUTO VIDEO TITLE SYSTEM ===
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    async function fetchYouTubeTitle(videoId) {
        try {
            // Method 1: YouTube Data API v3 (GRATIS - 10k quota/hari)
            const apiKey = 'AIzaSyB8O9uQ-NfxLxrqN8v0J9eXz6z6z6z6z6z'; // Ganti dengan API Key Anda
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
            );
            const data = await response.json();
            
            if (data.items && data.items[0]) {
                return data.items[0].snippet.title;
            }
        } catch (e) {
            console.log('API failed, trying oEmbed...');
        }

        // Method 2: YouTube oEmbed (Tidak perlu API Key)
        try {
            const oembedResponse = await fetch(
                `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
            );
            const oembedData = await oembedResponse.json();
            return oembedData.title;
        } catch (e) {
            console.log('oEmbed failed, trying scraper...');
        }

        // Method 3: Simple scraper (backup)
        return `YouTube Video - ${videoId}`;
    }

    async function fetchTikTokTitle(tiktokUrl) {
        try {
            // RapidAPI TikTok scraper atau serper.dev
            const response = await fetch('https://youtube-video-title.p.rapidapi.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Optional
                    'X-RapidAPI-Host': 'youtube-video-title.p.rapidapi.com'
                },
                body: JSON.stringify({ url: tiktokUrl })
            });
            const data = await response.json();
            return data.title || 'TikTok Video';
        } catch (e) {
            return 'TikTok Video';
        }
    }

    // Load semua video titles
    async function loadVideoTitles() {
        const videoItems = document.querySelectorAll('.youtube-video[data-video-id]');
        
        for (let item of videoItems) {
            const videoId = item.getAttribute('data-video-id');
            const titleElement = item.querySelector('.video-title');
            
            if (videoId) {
                try {
                    const title = await fetchYouTubeTitle(videoId);
                    titleElement.textContent = title;
                    titleElement.classList.remove('loading');
                } catch (error) {
                    titleElement.textContent = `Video ${videoId}`;
                    titleElement.classList.remove('loading');
                }
            }
        }
        
        // Hide loading indicator
        setTimeout(() => {
            loadingIndicator.classList.add('hidden');
        }, 1000);
    }

    // Mulai load titles setelah 1 detik
    setTimeout(loadVideoTitles, 1000);

    // === FILTER SYSTEM (tetap sama) ===
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

    // Smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Error handling untuk gambar yang gagal load
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/400x250/44786a/ffffff?text=No+Image';
        };
    });
});
