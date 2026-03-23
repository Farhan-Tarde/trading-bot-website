// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Hook Lenis into GSAP requestAnimationFrame
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. Text Split and Initial Reveal Animation (Hero Section)
    const splitText = new SplitType('.reveal-text', { types: 'lines, words, chars' })
    
    const tl = gsap.timeline();
    
    // Navbar fade in
    tl.from('.navbar', {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    
    // Badge fade in
    .from('.hero .badge', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, "-=0.5")
    
    // Hero Title Staggered Reveal
    .from(splitText.chars, {
        y: 50,
        opacity: 0,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power3.out',
        transformOrigin: "0% 50% -50"
    }, "-=0.2")
    
    // Hero Desc and Buttons fade up
    .from('.hero-desc, .hero-buttons', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.4")
    
    // Stats Container 3D Flip in
    .from('.stats-container', {
        y: 100,
        rotationX: 10,
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
    }, "-=0.6");

    // 2. Parallax Effects on Stats Container
    gsap.to('.stats-container', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 80,
        rotationX: 0,
        scale: 1.05
    });

    // 3. Scroll Trigger Fade Ups for standard sections
    const fadeUpElements = gsap.utils.toArray('.fade-up');
    fadeUpElements.forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 4. Staggered Feature Cards
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
    });

    // 5. App UI Parallax (Experience Section)
    gsap.to('.app-ui', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -50,
        rotationY: 0
    });

    // 6. Magnetic Buttons (Pipflow style interaction)
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power3.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
});
