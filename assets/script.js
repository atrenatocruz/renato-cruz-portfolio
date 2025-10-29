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
