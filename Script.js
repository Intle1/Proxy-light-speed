// iframe-overlay.js
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const overlay = document.getElementById('iframe-overlay');
  const toggleBtn = document.getElementById('toggle-overlay');
  const closeBtn = document.getElementById('close-overlay');
  const urlInput = document.getElementById('url-input');
  const loadBtn = document.getElementById('load-url');
  const iframe = document.getElementById('web-viewer');

  // Cloudflare Worker URL
  const CLOUDFLARE_WORKER_URL = 'https://patient-disk-95a1.johnsonjrquintonm.workers.dev/';

  // Set default URL to Cloudflare Worker
  urlInput.value = CLOUDFLARE_WORKER_URL;
  iframe.src = CLOUDFLARE_WORKER_URL;

  // Show overlay function
  function showOverlay() {
    overlay.classList.add('visible');
    urlInput.focus();
  }

  // Hide overlay function
  function hideOverlay() {
    overlay.classList.remove('visible');
  }

  // Toggle overlay function
  function toggleOverlay() {
    if (overlay.classList.contains('visible')) {
      hideOverlay();
    } else {
      showOverlay();
    }
  }

  // Load URL function
  function loadUrl() {
    let url = urlInput.value.trim();
    
    // Validate URL
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    
    try {
      // Create URL object to validate
      const validatedUrl = new URL(url);
      iframe.src = validatedUrl.toString();
    } catch (e) {
      // If URL is invalid, try adding https://
      try {
        const validatedUrl = new URL('https://' + url);
        iframe.src = validatedUrl.toString();
        urlInput.value = validatedUrl.toString();
      } catch (e) {
        alert('Please enter a valid URL');
      }
    }
  }

  // Event listeners
  toggleBtn.addEventListener('click', toggleOverlay);
  closeBtn.addEventListener('click', hideOverlay);
  loadBtn.addEventListener('click', loadUrl);
  
  // Load URL on Enter key in input
  urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      loadUrl();
    }
  });

  // Close overlay when clicking outside content (optional)
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      hideOverlay();
    }
  });
});
