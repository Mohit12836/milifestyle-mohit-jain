/**
 * Mi Lifestyle & Elements Wellness - Mohit P Jain
 * Interactive behaviors: Category filter, mobile drawer, WhatsApp pre-filled form,
 * Dynamic cursor spotlight and tilt physics for cards.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Product Catalog Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Subtle Cursor Light Follower on Desktop
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.product-card, .benefit-box, .cert-card, .hero-card-main');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
});

/**
 * Handle Contact Form submission and route straight to Mohit P Jain's WhatsApp
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const city = document.getElementById('userCity').value.trim();
  const interest = document.getElementById('userInterest').value;
  const message = document.getElementById('userProduct').value.trim();

  const phone = '916263879076';

  let text = `*New Website Inquiry for Mohit P Jain*\n\n`;
  text += `👤 *Name:* ${name}\n`;
  text += `📍 *City / State:* ${city}\n`;
  text += `🎯 *Interest:* ${interest}\n`;
  if (message) {
    text += `💬 *Query / Products:* ${message}\n`;
  }
  text += `\n_Sent via Mi Lifestyle Mohit P Jain Associate Website_`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}
