// Smooth scroll for in-page links
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
    
    // Add offset for sticky header
    const headerHeight = 56;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: Math.max(0, elementPosition),
      behavior: 'smooth'
    });
  });
}

// Enhanced reveal on scroll with staggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for multiple elements
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe sections and project cards
for (const section of document.querySelectorAll('section')) {
  section.classList.add('reveal');
  observer.observe(section);
}

for (const card of document.querySelectorAll('.project-apple')) {
  card.classList.add('reveal');
  observer.observe(card);
}

// Observe skill and info cards with stagger
const skillCards = document.querySelectorAll('.skill-card-elegant, .info-card-elegant');
skillCards.forEach((card, index) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${index * 50}ms`;
  observer.observe(card);
});

// Active navigation link highlighting - Apple style
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link-apple');

function updateActiveNavLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-gray-600', 'font-medium');
    link.classList.add('text-gray-900');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.remove('text-gray-900');
      link.classList.add('text-gray-600', 'font-medium');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);


// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple Custom Cursor Effect (Desktop only)
if (window.innerWidth >= 1024) {
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateCursor() {
      // Smooth cursor movement - more responsive
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effect
    const interactiveElements = document.querySelectorAll('a, button, .skill-card-elegant, .info-card-elegant, .contact-card-elegant');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }
}

// Typewriter Effect with Multiple Phrases
document.addEventListener('DOMContentLoaded', () => {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;
  
  const phrases = [
    'Crafting elegant, maintainable solutions across Traditional, Reactive Web and Mobile platforms.',
    'Building robust business applications with focus on performance and user experience.',
    'Delivering scalable solutions through clean code and thoughtful architecture.',
    'Transforming ideas into efficient, production-ready applications.'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;
  
  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Delete characters
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30; // Faster when deleting
      
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 1000; // Pause before typing new phrase
      }
    } else {
      // Type characters
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 50; // Normal typing speed
      
      if (charIndex === currentPhrase.length) {
        typingSpeed = 3000; // Pause at end of phrase
        isDeleting = true;
      }
    }
    
    setTimeout(typeWriter, typingSpeed);
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

// Magnetic Hover Effect for Cards (excluding contact card and hero links)
document.addEventListener('DOMContentLoaded', () => {
  const magneticElements = document.querySelectorAll('.skill-card-elegant, .info-card-elegant');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      if (window.innerWidth >= 1024) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        // Preserve existing transforms like translateY from hover
        const currentTransform = window.getComputedStyle(el).transform;
        if (currentTransform === 'none') {
          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          el.style.transform = `${currentTransform} translate(${moveX}px, ${moveY}px)`;
        }
      }
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
  
  // Add page load animation
  document.body.classList.add('page-load');
  
  // Parallax effect for background elements
  if (window.innerWidth >= 1024) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.animate-blob');
      parallaxElements.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }
});

// Add loading states for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileMenuLinks = document.querySelectorAll('.nav-link-mobile-apple');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      
      // Toggle menu visibility
      mobileMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle icons
      if (!isExpanded) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && 
          !menuButton.contains(e.target) && 
          !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        menuButton.focus();
      }
    });
  }
});
