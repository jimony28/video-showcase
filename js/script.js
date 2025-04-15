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

/* filepath: /Users/vanyvesvillaro/Documents/video-showcase/js/script.js */
// Add carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all carousel containers
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const cards = track.querySelectorAll('.video-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    // Calculate card width (including gap)
    const cardWidth = () => {
      const card = cards[0];
      const style = window.getComputedStyle(card);
      const width = card.offsetWidth;
      const marginRight = parseInt(style.marginRight) || 0;
      return width + marginRight;
    };
    
    // Scroll to previous set
    prevBtn.addEventListener('click', () => {
      const scrollAmount = cardWidth() * (window.innerWidth >= 1100 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Scroll to next set
    nextBtn.addEventListener('click', () => {
      const scrollAmount = cardWidth() * (window.innerWidth >= 1100 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Check arrow visibility based on scroll position
    function updateArrowVisibility() {
      const isAtStart = track.scrollLeft <= 10;
      const isAtEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 10;
      
      prevBtn.style.opacity = isAtStart ? '0.5' : '1';
      prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
      
      nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
      nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }
    
    // Initialize arrow visibility
    updateArrowVisibility();
    
    // Update arrow visibility on scroll
    track.addEventListener('scroll', updateArrowVisibility);
    
    // Update on window resize
    window.addEventListener('resize', updateArrowVisibility);
  });
});

/* filepath: /Users/vanyvesvillaro/Documents/video-showcase/js/script.js */
// Scroll Animation for Timeline
document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add visible class with staggered delay
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 150 * index); // 150ms delay between each item
          
          // Once it's visible, unobserve it
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2, // Trigger when 20% visible
      rootMargin: '0px 0px -10% 0px' // Slightly before items come into view
    });
    
    // Observe each timeline item
    timelineItems.forEach(item => {
      observer.observe(item);
    });
    
    // Trigger first item if it's already in viewport on load
    if (isElementInViewport(timelineItems[0])) {
      timelineItems[0].classList.add('visible');
      observer.unobserve(timelineItems[0]);
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  });