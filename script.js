document.addEventListener('DOMContentLoaded', function() {
    console.log('OkamiPorto - AUTO TITLES ACTIVATED! 🔥');
    
    // Update nama & tagline
    document.getElementById('nama').textContent = 'OKAMI';
    document.getElementById('tagline').textContent = 'Video Editor | Content Creator';
    
    // Profile click effect
    const profileImg = document.getElementById('profileImg');
    profileImg.addEventListener('click', function() {
        this.style.transform = 'scale(0.95) rotate(5deg)';
        setTimeout(() => this.style.transform = 'scale(1.05)', 150);
        setTimeout(() => this.style.transform = '', 300);
    });

    // === SUPERIOR VIDEO TITLE SYSTEM ===
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Proxy gratis untuk bypass CORS (GitHub Pages friendly)
    const PROXY_URL = 'https://api.allorigins.win/raw?url=';
    
    async function getYouTubeTitle(videoId) {
        const methods = [
            // Method 1: YouTube oEmbed ( paling reliable )
            () => fetch(`${PROXY_URL}${encodeURIComponent(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)}`)
                .then(r => r.json())
                .then(data => data.title)
                .catch(() => null),
            
            // Method 2: Noembed (backup)
            () => fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
                .then(r => r.json())
                .then(data => data.title)
                .catch(() => null),
            
            // Method 3: RapidAPI free tier
            () => fetch('https://youtube-video-title.p.rapidapi.com/lite/?video_id=' + videoId, {
                headers: {
                    'X-RapidAPI-Key': 'guest',
                    'X-RapidAPI-Host': 'youtube-video-title.p.rapidapi.com'
                }
            }).then(r => r.json()).then(data => data.title).catch(() => null)
        ];

        for (let method of methods) {
            try {
                const title = await method();
                if (title) return title;
            } catch (e) {
                console.log('Method failed:', e);
            }
        }
        
        return `🎮 YouTube Video #${videoId.slice(0,8)}`;
    }

    // TikTok title (bonus)
    async function getTikTokTitle(tiktokUrl) {
        try {
            const response = await fetch(`${PROXY_URL}${encodeURIComponent(tiktokUrl)}`);
            const html = await response.text();
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            return titleMatch ? titleMatch[1].replace('TikTok - ', '') : 'TikTok Video';
        } catch {
            return 'TikTok Video';
        }
    }

    // 🔥 MAIN FUNCTION - Load semua titles
    async function loadAllTitles() {
        console.log('🔄 Loading video titles...');
        const videoItems = document.querySelectorAll('[data-video-id]');
        
        // Process sequentially untuk smooth loading
        for (let i = 0; i < videoItems.length; i++) {
            const item = videoItems[i];
            const videoId = item.getAttribute('data-video-id');
            const titleEl = item.querySelector('.video-title');
            
            if (videoId && titleEl.classList.contains('loading')) {
                try {
                    titleEl.innerHTML = '⏳ Loading...';
                    const title = await getYouTubeTitle(videoId);
                    titleEl.textContent = title;
                    titleEl.classList.remove('loading');
                    console.log(`✅ Loaded: ${title.substring(0, 30)}...`);
                } catch (error) {
                    titleEl.textContent = `🎮 Video #${videoId.slice(0,8)}`;
                    titleEl.classList.remove('loading');
                }
            }
        }
        
        // Hide loading setelah selesai
        loadingIndicator.classList.add('hidden');
        console.log('🎉 All titles loaded!');
    }

    // Start loading after page ready
    setTimeout(loadAllTitles, 800);

    // === FILTER SYSTEM ===
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
                    setTimeout(() => item.classList.remove('hidden'), index * 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Image error fallback
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = `https://via.placeholder.com/400x250/44786a/ffffff?text=No+Preview`;
        };
    });

    // Auto refresh titles setiap 30 detik (opsional)
    setInterval(() => {
        const loadingTitles = document.querySelectorAll('.video-title.loading');
        if (loadingTitles.length > 0) loadAllTitles();
    }, 30000);
});
