/**
 * Travel Blog v2 - Main JavaScript
 * Features: Dark Mode, Search, Map Interaction, Gallery Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSearch();
    initMapInteraction();
    initGalleryLightbox();
    initScrollAnimations();
});

/**
 * Initialize Dark Mode Toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

/**
 * Initialize Search Functionality
 */
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchToggle || !searchModal) return;

    // Toggle search modal
    searchToggle.addEventListener('click', () => {
        searchModal.classList.toggle('active');
        if (searchModal.classList.contains('active') && searchInput) {
            searchInput.focus();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });

    // Close modal when clicking outside
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                if (searchResults) searchResults.innerHTML = '';
                return;
            }

            // Sample search data
            const articles = [
                { title: '在京都的古寺中寻找宁静', tag: '日本 · 京都' },
                { title: '阿尔卑斯山脉的徒步之旅', tag: '瑞士 · 阿尔卑斯' },
                { title: '浪漫之都的街头漫步', tag: '法国 · 巴黎' },
                { title: '水城威尼斯的梦幻之旅', tag: '意大利 · 威尼斯' },
                { title: '东京霓虹灯下的故事', tag: '日本 · 东京' },
                { title: '冰岛的极光与冰川', tag: '冰岛 · 雷克雅未克' }
            ];

            const destinations = [
                '日本', '瑞士', '法国', '意大利', '冰岛', '希腊', '新西兰', '泰国', '西班牙'
            ];

            // Filter results
            const matchedArticles = articles.filter(a => 
                a.title.toLowerCase().includes(query) || a.tag.toLowerCase().includes(query)
            );
            const matchedDestinations = destinations.filter(d => 
                d.toLowerCase().includes(query)
            );

            // Display results
            let html = '';
            
            if (matchedArticles.length > 0) {
                html += '<div style="margin-bottom: 1rem;"><strong style="color: var(--text-secondary); font-size: 0.85rem;">文章</strong></div>';
                matchedArticles.forEach(article => {
                    html += `
                        <div class="search-result-item">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${article.title}</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">${article.tag}</div>
                        </div>
                    `;
                });
            }

            if (matchedDestinations.length > 0) {
                html += '<div style="margin: 1rem 0 0.5rem 0; border-top: 1px solid var(--border-color); padding-top: 1rem;"><strong style="color: var(--text-secondary); font-size: 0.85rem;">目的地</strong></div>';
                matchedDestinations.forEach(dest => {
                    html += `
                        <div class="search-result-item">
                            <div>${dest}</div>
                        </div>
                    `;
                });
            }

            if (html === '') {
                html = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">未找到相关结果</div>';
            }

            if (searchResults) {
                searchResults.innerHTML = html;
            }
        });
    }
}

/**
 * Initialize Map Interaction
 */
function initMapInteraction() {
    const cityMarkers = document.querySelectorAll('.map-city-marker');
    
    cityMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            const title = this.getAttribute('title');
            console.log('Clicked city:', city, title);
            
            // You can add navigation logic here
            // For example: window.location.href = `stories.html#${city}`;
        });

        marker.addEventListener('mouseover', function() {
            this.style.r = 10;
        });

        marker.addEventListener('mouseout', function() {
            this.style.r = 6;
        });
    });
}

/**
 * Initialize Gallery Lightbox
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImage) return;

    let currentImageIndex = 0;
    let images = [];

    // Collect all images
    galleryItems.forEach((item, index) => {
        const imgSrc = item.getAttribute('data-image');
        if (imgSrc) {
            images.push(imgSrc);
        }

        // Open lightbox on click
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImage.src = images[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrevious() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevious);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            showPrevious();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

/**
 * Initialize Scroll Animations
 */
function initScrollAnimations() {
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and items
    document.querySelectorAll('.card, .video-item, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Newsletter Form Handler
 */
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`感谢订阅！我们已将确认邮件发送到 ${email}`);
            newsletterForm.reset();
        });
    }
});

/**
 * Video Item Click Handler
 */
document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.video-title').textContent;
            alert(`播放视频: ${title}\n\n(这是一个演示，实际应用中会打开视频播放页面)`);
        });
    });
});

/**
 * Utility: Close search modal
 */
function closeSearch() {
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
        searchModal.classList.remove('active');
    }
}

// Export for global use
window.closeSearch = closeSearch;
