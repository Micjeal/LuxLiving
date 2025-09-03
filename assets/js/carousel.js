document.addEventListener('DOMContentLoaded', function() {
    // Video Autoplay Handling
    const video = document.getElementById('bg-video');
    
    // Ensure video is set to autoplay and loop
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    // Try to force play the video
    const playVideo = () => {
        // If video is already playing, do nothing
        if (!video.paused) return;
        
        const playPromise = video.play();
        
        // If autoplay was prevented
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay was prevented:', error);
                // Show play button overlay
                showPlayButton();
            });
        }
    };
    
    // Show play button overlay
    const showPlayButton = () => {
        // Check if play button already exists
        if (document.getElementById('play-video-btn')) return;
        
        const playOverlay = document.createElement('div');
        playOverlay.className = 'play-overlay';
        playOverlay.innerHTML = `
            <button id="play-video-btn">
                <i class="fas fa-play"></i> Play Video
            </button>`;
        document.querySelector('.video-container').appendChild(playOverlay);
        
        // Add click handler for the play button
        document.getElementById('play-video-btn').addEventListener('click', () => {
            video.play()
                .then(() => playOverlay.style.display = 'none')
                .catch(e => console.log('Playback failed:', e));
        });
    };
    
    // Try to play when the page loads
    document.addEventListener('DOMContentLoaded', playVideo);
    
    // Try to play when the page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) playVideo();
    });
    
    // Try to play when the page is fully loaded
    window.addEventListener('load', playVideo);
    
    // Try to play on any user interaction
    const playOnInteraction = () => {
        playVideo();
        // Remove these listeners after first interaction
        window.removeEventListener('click', playOnInteraction);
        window.removeEventListener('touchstart', playOnInteraction);
    };
    
    window.addEventListener('click', playOnInteraction);
    window.addEventListener('touchstart', playOnInteraction);
    
    // Audio Controls
    const audio = document.getElementById('bg-music');
    const audioControl = document.getElementById('audio-control');
    let isAudioPlaying = false;

    // Initialize audio (muted by default due to autoplay policies)
    audio.volume = 0.5; // Set volume to 50%
    
    // Toggle audio on button click
    audioControl.addEventListener('click', function() {
        if (isAudioPlaying) {
            audio.pause();
            audioControl.innerHTML = '<i class="fas fa-music"></i>';
            audioControl.title = 'Play Music';
        } else {
            // On first interaction, unmute and play
            audio.play().then(() => {
                audio.muted = false;
                audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                audioControl.title = 'Pause Music';
            }).catch(error => {
                console.log('Audio playback failed:', error);
                audioControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
                audioControl.title = 'Enable Audio (Click to Unmute)';
            });
        }
        isAudioPlaying = !isAudioPlaying;
    });
    
    // Handle audio state changes
    audio.addEventListener('play', function() {
        audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
        audioControl.title = 'Pause Music';
    });
    
    audio.addEventListener('pause', function() {
        audioControl.innerHTML = '<i class="fas fa-music"></i>';
        audioControl.title = 'Play Music';
    });
    // Get all carousel elements
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const productShowcases = document.querySelectorAll('.product-showcase');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideInterval = 5000; // 5 seconds

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides and remove active classes
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        productShowcases.forEach(showcase => showcase.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Update current index (handles wrapping around)
        currentIndex = (index + carouselSlides.length) % carouselSlides.length;

        // Show the current slide and corresponding content
        carouselSlides[currentIndex].classList.add('active');
        productShowcases[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Function to go to the next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Function to go to the previous slide
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Event listeners for dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Function to start auto-sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }

    // Function to reset auto-slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pause auto-slide on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            resetAutoSlide();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key >= 1 && e.key <= carouselSlides.length.toString()) {
            // Jump to slide using number keys (1-9)
            showSlide(parseInt(e.key) - 1);
            resetAutoSlide();
        }
    });

    // Initialize the carousel
    showSlide(0);
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', () => {
        // Force a reflow to handle any responsive changes
        carouselSlides[currentIndex].style.opacity = 0;
        setTimeout(() => {
            carouselSlides[currentIndex].style.opacity = 1;
        }, 10);
    });
});
