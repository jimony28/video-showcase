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
});
    
/* filepath: /Users/vanyvesvillaro/Documents/video-showcase/js/script.js */
// Tab switching functionality for video gallery
document.addEventListener('DOMContentLoaded', function() {
    // Find all tab buttons and video grids
    const tabButtons = document.querySelectorAll('.tab-button');
    const videoGrids = document.querySelectorAll('.video-grid');
    
    // Add click event listeners to each tab button
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the category from the data attribute
        const category = button.getAttribute('data-category');
        
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all video grids
        videoGrids.forEach(grid => {
          grid.classList.add('hidden');
        });
        
        // Show the selected video grid
        const selectedGrid = document.querySelector(`.video-grid[data-category="${category}"]`);
        if (selectedGrid) {
          selectedGrid.classList.remove('hidden');
          
          // Pause all videos in hidden grids and play videos in visible grid
          document.querySelectorAll('.video-grid.hidden video').forEach(video => {
            video.pause();
          });
          
          selectedGrid.querySelectorAll('video').forEach(video => {
            // Try to play the video with error handling
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                // Auto-play was prevented, add a play button or handle accordingly
                console.log('Video autoplay was prevented', error);
              });
            }
          });
        }
      });
    });
    
    // Optional: Lazy load videos when they come into view
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (video.parentElement.closest('.video-grid:not(.hidden)')) {
              video.play().catch(err => console.log('Autoplay prevented:', err));
            }
            videoObserver.unobserve(video);
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.video-card video').forEach(video => {
        videoObserver.observe(video);
      });
    }
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