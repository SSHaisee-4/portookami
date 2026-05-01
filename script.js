document.addEventListener('DOMContentLoaded', function() {
    console.log('OkamiPorto loaded with YouTube/TikTok popup system!');
    
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

    // === YOUTUBE/TIKTOK POPUP SYSTEM ===
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');
    const closeBtn = document.querySelector('.close-btn');

    // Fungsi untuk buka video
    function openVideo(videoUrl, title = 'Video', desc = 'Check this awesome video!') {
        videoPlayer.src = videoUrl;
        videoTitle.textContent = title;
        videoDesc.textContent = desc;
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // Fungsi untuk tutup video
    function closeVideo() {
        videoModal.style.display = 'none';
        videoPlayer.src = ''; // Stop video
        document.body.style.overflow = ''; // Restore scroll
    }

    // Event listeners untuk modal
    closeBtn.addEventListener('click', closeVideo);
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideo();
        }
    });

    // Keyboard support (ESC to close)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideo();
        }
    });

    // === AUTO DETECT YOUTUBE LINKS & ADD POPUP FUNCTIONALITY ===
    const youtubeItems = document.querySelectorAll('.youtube-video .view-btn');
    youtubeItems.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extract YouTube ID from URL
            const href = this.getAttribute('href');
            const videoId = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
            
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                openVideo(embedUrl, 'OKAMI Gameplay', 'Watch the full video now!');
            }
        });
    });

    // Smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
