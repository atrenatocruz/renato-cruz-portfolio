// Smooth scroll for in-page links
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    
    // Add offset for fixed header
    const headerHeight = 64;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
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

for (const card of document.querySelectorAll('.project-card, .skill-card')) {
  card.classList.add('reveal');
  observer.observe(card);
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-white');
    link.classList.add('text-ink-200');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.remove('text-ink-200');
      link.classList.add('text-white');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Form handling with better UX
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successMessage = document.getElementById('form-success');
    const submitButton = form.querySelector('button');
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      successMessage.classList.remove('hidden');
      form.reset();
      submitButton.textContent = 'Send';
      submitButton.disabled = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    }, 1500);
  });
}

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
