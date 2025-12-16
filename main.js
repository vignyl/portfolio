// Portfolio Main JavaScript - Smooth Animations & Interactions
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTypewriterEffect();
        this.setupSkillsRadar();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupFloatingIcons();
        this.setupNavigation();
        this.setupHoverEffects();
    }

    // Scroll-triggered animations with staggered reveals
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('stagger-item')) {
                        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 600,
                            delay: delay,
                            easing: 'easeOutCubic'
                        });
                    } else {
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 800,
                            easing: 'easeOutCubic'
                        });
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all elements with scroll animation classes
        document.querySelectorAll('.scroll-reveal, .stagger-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Typewriter effect for hero section
    setupTypewriterEffect() {
        if (document.getElementById('typed-name')) {
            new Typed('#typed-name', {
                strings: ['SINCLAIRE MBOUNDA'],
                typeSpeed: 100,
                startDelay: 500,
                showCursor: true,
                cursorChar: '|',
                onComplete: () => {
                    setTimeout(() => {
                        if (document.getElementById('typed-title')) {
                            new Typed('#typed-title', {
                                strings: ['Ingénieur Logiciel Full-Stack', 'Développeur .NET, ReactJS & Flutter'],
                                typeSpeed: 50,
                                startDelay: 300,
                                backSpeed: 30,
                                backDelay: 2000,
                                loop: true
                            });
                        }
                    }, 1000);
                }
            });
        }
    }

    // Interactive skills radar chart
    setupSkillsRadar() {
        if (document.getElementById('skills-radar')) {
            const skillsData = [
                { name: '.NET/C#', value: 95, years: '6+ ans' },
                { name: 'ReactJS', value: 90, years: '4+ ans' },
                { name: 'Flutter', value: 85, years: '3+ ans' },
                { name: 'SQL Server', value: 88, years: '5+ ans' },
                { name: 'Azure', value: 75, years: '2+ ans' },
                { name: 'API REST', value: 92, years: '6+ ans' }
            ];

            const chart = echarts.init(document.getElementById('skills-radar'));
            
            const option = {
                backgroundColor: 'transparent',
                radar: {
                    indicator: skillsData.map(skill => ({
                        name: skill.name,
                        max: 100
                    })),
                    center: ['50%', '50%'],
                    radius: '70%',
                    axisName: {
                        color: '#64748b',
                        fontSize: 12,
                        fontWeight: 'bold'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(100, 116, 139, 0.2)'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(100, 116, 139, 0.3)'
                        }
                    }
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: skillsData.map(skill => skill.value),
                        name: 'Compétences',
                        areaStyle: {
                            color: 'rgba(245, 158, 11, 0.2)'
                        },
                        lineStyle: {
                            color: '#f59e0b',
                            width: 2
                        },
                        itemStyle: {
                            color: '#f59e0b'
                        }
                    }]
                }],
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        const index = params.dataIndex;
                        const skill = skillsData[index];
                        return `${skill.name}<br/>Niveau: ${skill.value}%<br/>Expérience: ${skill.years}`;
                    }
                }
            };

            chart.setOption(option);
            
            // Animate chart on load
            setTimeout(() => {
                chart.resize();
            }, 100);

            // Responsive resize
            window.addEventListener('resize', () => {
                chart.resize();
            });
        }
    }

    // Project filtering system
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const technologies = card.dataset.technologies.split(',');
                    const shouldShow = filter === 'all' || technologies.includes(filter);

                    if (shouldShow) {
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 400,
                            delay: index * 50,
                            easing: 'easeOutCubic'
                        });
                        card.style.display = 'block';
                    } else {
                        anime({
                            targets: card,
                            opacity: [1, 0],
                            scale: [1, 0.8],
                            duration: 300,
                            complete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }

    // Contact form with validation
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const steps = document.querySelectorAll('.form-step');
        const nextBtns = document.querySelectorAll('.next-step');
        const prevBtns = document.querySelectorAll('.prev-step');
        const progressBar = document.querySelector('.progress-bar');
        let currentStep = 0;

        // Form validation
        const validateStep = (stepIndex) => {
            const currentStepEl = steps[stepIndex];
            const requiredFields = currentStepEl.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            return isValid;
        };

        // Next step
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    currentStep++;
                    updateFormStep();
                }
            });
        });

        // Previous step
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                updateFormStep();
            });
        });

        const updateFormStep = () => {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === currentStep);
            });

            // Update progress bar
            const progress = ((currentStep + 1) / steps.length) * 100;
            anime({
                targets: progressBar,
                width: `${progress}%`,
                duration: 400,
                easing: 'easeOutCubic'
            });
        };

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success animation
                anime({
                    targets: '.success-message',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    easing: 'easeOutCubic'
                });
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
                currentStep = 0;
                updateFormStep();
            }, 2000);
        });
    }

    // Floating technology icons with physics
    setupFloatingIcons() {
        const canvas = document.getElementById('floating-icons');
        if (!canvas) return;

        // Create floating tech icons using CSS animations
        const techIcons = ['⚡', '🔧', '💻', '🚀', '⚛️', '📱', '☁️', '🔒'];
        const container = document.querySelector('.hero-section');

        techIcons.forEach((icon, index) => {
            const iconEl = document.createElement('div');
            iconEl.className = 'floating-icon';
            iconEl.textContent = icon;
            iconEl.style.left = Math.random() * 100 + '%';
            iconEl.style.top = Math.random() * 100 + '%';
            iconEl.style.animationDelay = Math.random() * 10 + 's';
            iconEl.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            container.appendChild(iconEl);
        });
    }

    // Navigation with smooth scrolling
    setupNavigation() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetEl = document.getElementById(targetId);
                
                if (targetEl) {
                    anime({
                        targets: 'html, body',
                        scrollTop: targetEl.offsetTop - 80,
                        duration: 800,
                        easing: 'easeInOutCubic'
                    });
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Hover effects for interactive elements
    setupHoverEffects() {
        // 3D tilt effect for cards
        const cards = document.querySelectorAll('.card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                anime({
                    targets: card,
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            card.addEventListener('mouseleave', (e) => {
                anime({
                    targets: card,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn, button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    // Utility method for smooth page transitions
    static fadeInPage() {
        anime({
            targets: 'body',
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    PortfolioAnimations.fadeInPage();
    new PortfolioAnimations();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume animations
        anime.running.forEach(animation => {
            animation.play();
        });
    } else {
        // Pause animations
        anime.running.forEach(animation => {
            animation.pause();
        });
    }
});

// Utility functions for common animations
const AnimationUtils = {
    // Counter animation for statistics
    animateCounter: (element, target, duration = 2000) => {
        anime({
            targets: { value: 0 },
            value: target,
            duration: duration,
            easing: 'easeOutCubic',
            update: function(anim) {
                element.textContent = Math.round(anim.animatables[0].target.value);
            }
        });
    },

    // Pulse animation for attention
    pulse: (element) => {
        anime({
            targets: element,
            scale: [1, 1.1, 1],
            duration: 1000,
            easing: 'easeInOutSine',
            loop: true
        });
    },

    // Shake animation for errors
    shake: (element) => {
        anime({
            targets: element,
            translateX: [0, -10, 10, -10, 10, 0],
            duration: 500,
            easing: 'easeInOutSine'
        });
    }
};