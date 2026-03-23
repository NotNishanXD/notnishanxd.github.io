"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* =========================
     CUSTOM CURSOR
  ========================= */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (!isTouch && cursorDot && cursorOutline) {
    let x = 0, y = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;

      cursorDot.style.left = x + "px";
      cursorDot.style.top = y + "px";
    });

    function animateCursor() {
      outlineX += (x - outlineX) * 0.15;
      outlineY += (y - outlineY) * 0.15;

      cursorOutline.style.left = outlineX + "px";
      cursorOutline.style.top = outlineY + "px";

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, i').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = "60px";
        cursorOutline.style.height = "60px";
        cursorOutline.style.background = "rgba(139,92,246,0.15)";
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.background = "transparent";
      });
    });
  }

  /* =========================
     MOBILE NAV
  ========================= */
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };
  }

  /* =========================
     ACTIVE LINK ON SCROLL
  ========================= */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');

  window.addEventListener('scroll', () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (menuIcon && navbar) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }
  });

  /* =========================
     TYPING EFFECT
  ========================= */
  const words = ["Web Developer", "Node.js Enthusiast", "Python Programmer", "UI Architect"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typed = document.querySelector(".typed-text");

  function typeLoop() {
    if (!typed) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typed.textContent = currentWord.substring(0, charIndex--);
    } else {
      typed.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(typeLoop, speed);
  }

  typeLoop();

  /* =========================
     SCROLL REVEAL (AUTO)
  ========================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.bento-card, .heading').forEach(el => {
    observer.observe(el);
  });

  /* =========================
     TILT + SHIMMER
  ========================= */
  if (!isTouch) {
    const cards = document.querySelectorAll('.bento-card[data-tilt]');

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = x - rect.width / 2;
        const centerY = y - rect.height / 2;

        const rotateX = -(centerY / rect.height) * 12;
        const rotateY = (centerX / rect.width) * 12;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform =
          `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      });
    });
  }

});