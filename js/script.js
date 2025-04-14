/* filepath: /Users/vanyvesvillaro/Documents/video-showcase/js/script.js */
// Add this function to your script.js file

// Function to ensure videos play properly
document.addEventListener('DOMContentLoaded', function() {
    // Get all videos in mini cards
    const videos = document.querySelectorAll('.mini-card video');
    
    // Function to attempt playback
    function attemptPlayback() {
      videos.forEach(video => {
        // Reset the video
        video.load();
        
        // Play the video with error handling
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Video playback error:', error);
            // Try again after a short delay
            setTimeout(() => {
              video.load();
              video.play().catch(err => console.warn('Retry failed:', err));
            }, 1000);
          });
        }
      });
    }
    
    // Initial attempt
    attemptPlayback();
    
    // Try again on visibility change (tab switching)
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        attemptPlayback();
      }
    });
    
    // Alternative approach - force videos to play on user interaction
    document.addEventListener('click', function() {
      attemptPlayback();
    }, {once: true});
  });

  /* filepath: /Users/vanyvesvillaro/Documents/video-showcase/js/script.js */
// Add touch support for card stack hover effect
document.addEventListener('DOMContentLoaded', function() {
    const cardStack = document.querySelector('.card-stack');
    
    if (cardStack) {
      // Add touch event listeners
      cardStack.addEventListener('touchstart', function() {
        this.classList.add('hover-active');
      });
      
      // Optional: Remove the hover effect when touching elsewhere
      document.addEventListener('touchstart', function(e) {
        if (!cardStack.contains(e.target)) {
          cardStack.classList.remove('hover-active');
        }
      });
      
      // Add CSS for touch support
      const style = document.createElement('style');
      style.textContent = `
        .card-stack.hover-active .mini-card:nth-child(1) {
          left: calc(50% - 336px) !important;
          transform: rotate(12deg) translateY(-12px) !important;
          z-index: 2 !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35) !important;
        }
        
        .card-stack.hover-active .mini-card:nth-child(2) {
          left: calc(50% - 144px) !important;
          transform: translateY(-40px) !important;
          z-index: 1 !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35) !important;
        }
        
        .card-stack.hover-active .mini-card:nth-child(3) {
          left: calc(50% + 48px) !important;
          transform: rotate(-12deg) translateY(-12px) !important;
          z-index: 3 !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35) !important;
        }
      `;
      document.head.appendChild(style);
    }
  });

  // Add touch support for card stack hover effect
document.addEventListener('DOMContentLoaded', function() {
    const cardStack = document.querySelector('.card-stack');
    
    if (cardStack) {
      // Toggle hover class on touch
      cardStack.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.classList.toggle('hover-active');
      });
      
      // Ensure videos stay visible while hovering
      const videos = cardStack.querySelectorAll('iframe.tiktok-video');
      cardStack.addEventListener('mouseenter', function() {
        videos.forEach(video => {
          if (video.src.indexOf('autoplay=false') > -1) {
            video.src = video.src.replace('autoplay=false', 'autoplay=true');
          }
        });
      });
    }
  });