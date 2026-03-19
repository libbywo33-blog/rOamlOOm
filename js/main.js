// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Search Functionality
const searchToggle = document.getElementById('search-toggle');
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchToggle.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
});

searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchModal.classList.remove('active');
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (!query) {
        searchResults.innerHTML = '';
        return;
    }

    // Search data - Chinese content
    const articles = [
        { title: '四个女仔的东欧自由行', tag: '匈牙利 奥地利 捷克', url: 'post/article.html?id=1' },
        { title: '冰岛的极光与冰川', tag: '冰岛', url: 'post/article.html?id=2' },
        { title: '罗马的历史与浪漫', tag: '意大利 罗马', url: 'post/article.html?id=3' },
        { title: '巴塞罗那的艺术之旅', tag: '西班牙 巴塞罗那', url: 'post/article.html?id=4' },
        { title: '特罗姆瑟的北极体验', tag: '挪威 特罗姆瑟', url: 'post/article.html?id=5' },
        { title: '米兰的时尚与艺术', tag: '意大利 米兰', url: 'post/article.html?id=6' },
        { title: '维也纳的古典音乐', tag: '奥地利 维也纳', url: 'post/article.html?id=1' },
        { title: '布达佩斯的温泉', tag: '匈牙利 布达佩斯', url: 'post/article.html?id=2' },
        { title: '布拉格的童话世界', tag: '捷克 布拉格', url: 'post/article.html?id=3' }
    ];

    const destinations = [
        { name: '维也纳', url: 'stories.html#vienna' },
        { name: '布达佩斯', url: 'stories.html#budapest' },
        { name: '布拉格', url: 'stories.html#prague' },
        { name: '米兰', url: 'stories.html#milan' },
        { name: '罗马', url: 'stories.html#rome' },
        { name: '冰岛', url: 'stories.html#iceland' },
        { name: '特罗姆瑟', url: 'stories.html#tromso' },
        { name: '西班牙', url: 'stories.html#spain' },
        { name: '纽约', url: 'stories.html#newyork' },
        { name: '巴黎', url: 'stories.html#paris' },
        { name: '北海道', url: 'stories.html#hokkaido' }
    ];

    // Filter results
    const matchedArticles = articles.filter(a => 
        a.title.toLowerCase().includes(query) || a.tag.toLowerCase().includes(query)
    );

    const matchedDestinations = destinations.filter(d => 
        d.name.toLowerCase().includes(query)
    );

    // Display results
    let html = '';
    
    if (matchedArticles.length > 0) {
        html += '<div style="margin-bottom: 1rem;"><strong style="color: var(--text-secondary); font-size: 0.85rem;">故事</strong></div>';
        matchedArticles.forEach(article => {
            html += `
                <a href="${article.url}" class="search-result-item" style="text-decoration: none; color: inherit;">
                    <div class="search-result-title">${article.title}</div>
                    <div class="search-result-tag">${article.tag}</div>
                </a>
            `;
        });
    }

    if (matchedDestinations.length > 0) {
        html += '<div style="margin-bottom: 1rem; margin-top: 1rem;"><strong style="color: var(--text-secondary); font-size: 0.85rem;">目的地</strong></div>';
        matchedDestinations.forEach(dest => {
            html += `
                <a href="${dest.url}" class="search-result-item" style="text-decoration: none; color: inherit;">
                    <div class="search-result-title">${dest.name}</div>
                </a>
            `;
        });
    }

    if (html === '') {
        html = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">未找到结果</div>';
    }

    searchResults.innerHTML = html;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .story-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Prevent form submission for demo
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('感谢您的消息！我会尽快回复您。');
        form.reset();
    });
});

// Initialize responsive design
function initResponsiveDesign() {
    const isMobile = window.innerWidth < 768;
    const footprintsSection = document.querySelector('.footprints-section');
    const storiesDivider = document.querySelector('.stories-divider');
    
    if (footprintsSection) {
        footprintsSection.style.gridTemplateColumns = isMobile ? '1fr' : '300px 1fr';
    }
    
    if (storiesDivider) {
        storiesDivider.style.gridTemplateColumns = isMobile ? '1fr' : '1fr 1fr';
    }
}

window.addEventListener('resize', initResponsiveDesign);
document.addEventListener('DOMContentLoaded', initResponsiveDesign);
