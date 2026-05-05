document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.getElementById('languageBtn');
    const languageModal = document.getElementById('languageModal');
    const closeLanguageModal = document.getElementById('closeLanguageModal');
    const languageOptions = document.querySelectorAll('.language-option');
    const currentLangSpan = document.getElementById('currentLang');

    const issueCards = document.querySelectorAll('.issue-card');
    const issueModal = document.getElementById('issueModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const issueForm = document.getElementById('issueForm');
    const modalTitle = document.getElementById('modalTitle');
    const issueTypeInput = document.getElementById('issueTypeInput');

    let selectedIssue = '';

    if (languageBtn) languageBtn.addEventListener('click', () => languageModal.classList.add('active'));
    if (closeLanguageModal) closeLanguageModal.addEventListener('click', () => languageModal.classList.remove('active'));
    if (languageModal) languageModal.addEventListener('click', (e) => { if (e.target === languageModal) languageModal.classList.remove('active'); });

    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentLangSpan.textContent = option.dataset.lang.toUpperCase();
            languageModal.classList.remove('active');
        });
    });

    issueCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedIssue = card.dataset.issue;
            modalTitle.textContent = `Submit Issue Report - ${selectedIssue}`;
            issueTypeInput.value = selectedIssue;
            issueModal.classList.add('active');
        });
    });

    if (closeModal) closeModal.addEventListener('click', () => { issueModal.classList.remove('active'); issueForm.reset(); });
    if (cancelBtn) cancelBtn.addEventListener('click', () => { issueModal.classList.remove('active'); issueForm.reset(); });
    if (issueModal) issueModal.addEventListener('click', (e) => { if (e.target === issueModal) { issueModal.classList.remove('active'); issueForm.reset(); } });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (issueModal) issueModal.classList.remove('active');
            languageModal.classList.remove('active');
        }
    });

    // Testimonials carousel
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    if (track && prevBtn && nextBtn) {
        const scrollAmt = 370;
        prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmt, behavior: 'smooth' }));
    }

    // Scroll reveal
    const scrollElements = document.querySelectorAll('.hero-left, .hero-right, .section-header, .issues-grid, .services-grid, .steps-grid, .proof-grid, .features-grid, .stats-banner, .testimonials-track, .promise-features, .cta-content, .stats-grid');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'all 0.7s cubic-bezier(.23,1,.32,1)';
        scrollObserver.observe(el);
    });

    // Ripple on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.cssText = 'position:absolute;width:20px;height:20px;background:rgba(255,255,255,0.5);border-radius:50%;pointer-events:none;animation:ripple .6s ease-out';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Inject ripple keyframe
    const style = document.createElement('style');
    style.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0}}';
    document.head.appendChild(style);
});
