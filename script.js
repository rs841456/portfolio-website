/* ============================================
   Rajan Kumar Portfolio - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  // --- Scroll to top button ---
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // --- Close mobile menu on link click ---
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.getElementById('navbarNav');
      if (collapse.classList.contains('show')) {
        toggler.click();
      }
    });
  });

  // --- Animated counters in hero ---
  function animateCounter(el, target) {
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = count;
    }, 40);
  }

  // --- Skill cards staggered animation (Intersection Observer) ---
  const skillCards = document.querySelectorAll('.skill-card, .soft-skill-card, .project-card, .cert-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80 * (entry.target.dataset.delay || 0));
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  skillCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.dataset.delay = i % 6;
    cardObserver.observe(card);
  });

  // --- Contact form ---
  // --- Contact Form with EmailJS ---
const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const btn = form.querySelector(".btn-submit");
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        emailjs.send(
            "service_62jiro2",
            "template_d5802z9",
            {
                from_name: document.getElementById("name").value,
                from_email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value
            }
        )
        .then(function () {

            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = "linear-gradient(135deg, #10b981, #059669)";

            alert("Message Sent Successfully!");

            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = "";
            }, 3000);

        })
        .catch(function (error) {

            console.error(error);

            alert("Failed to send message!");

            btn.innerHTML = originalHTML;
            btn.style.background = "";

        });

    });

}

  // --- Typing animation for hero role ---
  const roles = ['Aspiring Data Analyst', 'Power BI Developer', 'SQL Enthusiast', 'Python Learner'];
  let rIdx = 0, cIdx = 0, deleting = false;
  const typingEl = document.getElementById('typingRole');
  function type() {
    if (!typingEl) return;
    const current = roles[rIdx];
    if (!deleting) {
      typingEl.textContent = current.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typingEl.textContent = current.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

});
