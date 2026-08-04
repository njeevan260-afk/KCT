/**
 * ==========================================================================
 * KUMAR CHARITABLE FOUNDATION - PHASE 1 SCRIPT
 * Handles Sticky Navigation, Responsive Mobile Hamburger Menu, Accessibility,
 * and Interactive States.
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.getElementById('header');
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  /**
   * 1. STICKY HEADER SCROLL EFFECT
   * Adds 'scrolled' class when page is scrolled past threshold.
   */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Throttle scroll listener for high performance
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Initial check on load
  handleScroll();

  /**
   * 2. MOBILE NAVIGATION HAMBURGER TOGGLE
   * Opens / Closes the mobile navigation menu drawer and backdrop overlay.
   */
  const openMobileMenu = () => {
    hamburgerToggle.classList.add('active');
    hamburgerToggle.setAttribute('aria-expanded', 'true');
    primaryNav.classList.add('open');
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMobileMenu = () => {
    hamburgerToggle.classList.remove('active');
    hamburgerToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
    navOverlay.classList.remove('open');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  const toggleMobileMenu = () => {
    const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  // Toggle button click event
  hamburgerToggle.addEventListener('click', toggleMobileMenu);

  // Overlay backdrop click event closes menu
  navOverlay.addEventListener('click', closeMobileMenu);

  /**
   * 3. NAVIGATION LINK CLICK HANDLERS
   * Updates active state and closes mobile menu upon link selection.
   */
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      // Remove active class from all links
      navLinks.forEach(item => item.classList.remove('active'));
      
      // Set active on clicked link
      link.classList.add('active');

      // Close mobile drawer if open
      closeMobileMenu();
    });
  });

  /**
   * 4. ACCESSIBILITY & KEYBOARD NAVIGATION
   * Allows closing mobile menu via Escape key.
   */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      if (hamburgerToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
        hamburgerToggle.focus(); // Restore focus to menu toggle button
      }
    }
  });

  /**
   * 5. RESIZE LISTENER
   * Resets mobile menu state if viewport is resized beyond tablet breakpoint.
   */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 868) {
      if (hamburgerToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    }
  });

  /**
   * 6. SCROLL FADE-IN ANIMATIONS
   * Reveals elements with .fade-in-on-scroll class as they enter the viewport.
   */
  const animatedElements = document.querySelectorAll('.fade-in-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver support
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  /**
   * 7. SCROLL SPY ACTIVE NAVIGATION HIGHLIGHTING
   * Automatically updates active state on nav links as section scrolls into view.
   */
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateActiveNavLink);
  });

  /**
   * ==========================================================================
   * 8. STUDENT INFORMATION MODULE
   * Structured data array for students supported by the foundation.
   * Admin friendly: To add a new student, simply append a new student object
   * to the studentsData array below.
   * ==========================================================================
   */
  const DEFAULT_APPLICATION_LINK = 'https://drive.google.com/drive/folders/1YUI-34bioh0QdesMSUFUfiWvES9rDenO?usp=sharing';

  const studentsData = [
    {
      id: 1,
      name: 'Sadiya Kousar',
      course: 'B.E.',
      branch: 'Electronics and Communication Engineering (ECE)',
      college: 'Jyothi Institute of Technology',
      year: '1st Year',
      applicationLink: DEFAULT_APPLICATION_LINK
    },
    {
      id: 2,
      name: 'Ananya J',
      course: 'B.E.',
      branch: 'Computer Science and Engineering (CSE)',
      college: 'Jyothi Institute of Technology',
      year: '1st Year',
      applicationLink: DEFAULT_APPLICATION_LINK
    },
    {
      id: 3,
      name: 'K. Yashaswini',
      course: 'B.E.',
      branch: 'Electronics and Communication Engineering (ECE)',
      college: 'Jyothi Institute of Technology',
      year: '1st Year',
      applicationLink: DEFAULT_APPLICATION_LINK
    },
    {
      id: 4,
      name: 'Dhananjaya R.',
      course: 'B.E.',
      branch: 'Electronics and Communication Engineering (ECE)',
      college: 'Government Engineering College, Ramanagara',
      year: '1st Year',
      applicationLink: DEFAULT_APPLICATION_LINK
    },
    {
      id: 5,
      name: 'Jyothi',
      course: 'B.E.',
      branch: 'Computer Science and Engineering (CSE)',
      college: 'Government Engineering College, Mandya',
      year: '1st Year',
      applicationLink: DEFAULT_APPLICATION_LINK
    }
  ];

  const studentsGrid = document.getElementById('students-grid');
  const searchInput = document.getElementById('student-search-input');
  const clearSearchBtn = document.getElementById('search-clear-btn');
  const countBadge = document.getElementById('students-count-badge');
  const noResultsEl = document.getElementById('students-no-results');
  const resetSearchBtn = document.getElementById('reset-search-btn');

  if (studentsGrid) {
    const renderStudents = (list) => {
      studentsGrid.innerHTML = '';

      if (list.length === 0) {
        noResultsEl.style.display = 'block';
        if (countBadge) countBadge.textContent = '0 Scholars Found';
        return;
      }

      noResultsEl.style.display = 'none';
      if (countBadge) {
        countBadge.textContent = `Showing ${list.length} ${list.length === 1 ? 'Scholar' : 'Scholars'}`;
      }

      list.forEach(student => {
        const card = document.createElement('article');
        card.className = 'student-card';

        // Extract initials for avatar
        const initials = student.name
          .split(' ')
          .map(part => part.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2);

        card.innerHTML = `
          <div class="student-card-header">
            <div class="student-avatar" aria-hidden="true">${initials}</div>
            <div class="student-header-text">
              <h3 class="student-name">${student.name}</h3>
              <span class="student-year-badge">${student.year}</span>
            </div>
          </div>
          
          <div class="student-details">
            <div class="detail-item">
              <span class="detail-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                Course
              </span>
              <span class="detail-value font-medium">${student.course}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                Branch
              </span>
              <span class="detail-value">${student.branch}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                College
              </span>
              <span class="detail-value">${student.college}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Academic Year
              </span>
              <span class="detail-value">${student.year}</span>
            </div>
          </div>

          <div class="student-card-footer">
            <a 
              href="${student.applicationLink}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-view-application"
            >
              <span>View Application</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        `;

        studentsGrid.appendChild(card);
      });
    };

    // Initial Render
    renderStudents(studentsData);

    // Filter Logic
    const handleSearch = () => {
      const query = searchInput.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
      }

      const filtered = studentsData.filter(student => {
        return (
          student.name.toLowerCase().includes(query) ||
          student.course.toLowerCase().includes(query) ||
          student.branch.toLowerCase().includes(query) ||
          student.college.toLowerCase().includes(query) ||
          student.year.toLowerCase().includes(query)
        );
      });

      renderStudents(filtered);
    };

    if (searchInput) {
      searchInput.addEventListener('input', handleSearch);
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        handleSearch();
        searchInput.focus();
      });
    }

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        handleSearch();
        searchInput.focus();
      });
    }
  }

  /**
   * ==========================================================================
   * 9. TESTIMONIALS CAROUSEL MODULE
   * Rotating slider with 20 text testimonials, auto-play (5s), navigation,
   * five-star ratings, and indicator dots.
   * ==========================================================================
   */
  const testimonials = [
    "The scholarship from the Kumar Charitable Foundation gave me the confidence to pursue higher education without worrying about financial difficulties. I am sincerely grateful for this opportunity.",
    "Receiving support from the foundation has motivated me to work harder every day. It has inspired me to believe that determination and education can change my future.",
    "The interview process was fair, encouraging, and transparent. The guidance provided by the foundation helped me choose the right path for my academic journey.",
    "The financial assistance reduced the burden on my family and allowed me to focus completely on my studies. This support has brought hope to our entire family.",
    "I sincerely thank Mr. Rudrakumar Sir and all the coordinators for believing in students like me. Their encouragement motivates us to achieve our dreams.",
    "The annual meetings conducted by the foundation help students interact, learn from one another, and stay motivated throughout their educational journey.",
    "The foundation not only provides scholarships but also teaches us responsibility, discipline, and the importance of giving back to society in the future.",
    "I feel proud to be a part of the Kumar Charitable Foundation family. The guidance and encouragement I receive continue to inspire me every day.",
    "The scholarship has helped me continue my engineering education with confidence. It has opened doors to opportunities that once seemed beyond my reach.",
    "The foundation believes in students based on merit, ambition, and financial need. This fair selection process gives deserving students an equal opportunity to succeed.",
    "Education is the greatest investment in a student's future. The foundation has made that investment in me, and I will always remain grateful.",
    "The support extended by the foundation has strengthened my confidence and encouraged me to pursue my goals with determination.",
    "Every interaction with the foundation reminds us that kindness and education together can transform lives.",
    "I am thankful to every coordinator who dedicates their time and effort to selecting and supporting deserving students.",
    "The scholarship has reduced my financial worries and allowed me to concentrate on learning and building my future.",
    "The encouragement from the foundation inspires students to dream bigger and work harder every single day.",
    "The foundation's transparent scholarship process builds trust and confidence among students and their families.",
    "Receiving educational support has motivated me to perform better academically and become a responsible citizen.",
    "I hope to give back to society in the future, just as the Kumar Charitable Foundation has supported me today.",
    "The Kumar Charitable Foundation is transforming lives through education, compassion, and equal opportunities for deserving students."
  ];

  const testimonialQuote = document.getElementById('testimonial-quote');
  const testimonialPrevBtn = document.getElementById('testimonial-prev-btn');
  const testimonialNextBtn = document.getElementById('testimonial-next-btn');
  const testimonialDots = document.getElementById('testimonial-dots');
  const testimonialCounter = document.getElementById('testimonial-counter');
  const testimonialCard = document.getElementById('testimonial-card');

  if (testimonialQuote && testimonials.length > 0) {
    let currentTestimonialIndex = 0;
    let autoSlideInterval = null;

    // Render Indicator Dots
    if (testimonialDots) {
      testimonialDots.innerHTML = '';
      testimonials.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToTestimonial(idx);
          resetAutoSlide();
        });
        testimonialDots.appendChild(dot);
      });
    }

    const updateTestimonial = (index) => {
      // Transition effect
      testimonialQuote.style.opacity = '0';
      testimonialQuote.style.transform = 'translateY(6px)';

      setTimeout(() => {
        testimonialQuote.textContent = `"${testimonials[index]}"`;
        testimonialQuote.style.opacity = '1';
        testimonialQuote.style.transform = 'translateY(0)';
      }, 180);

      if (testimonialCounter) {
        testimonialCounter.textContent = `${index + 1} / ${testimonials.length}`;
      }

      // Update active dot
      if (testimonialDots) {
        const dots = testimonialDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          if (idx === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    };

    const goToTestimonial = (index) => {
      currentTestimonialIndex = (index + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    };

    const nextTestimonial = () => {
      goToTestimonial(currentTestimonialIndex + 1);
    };

    const prevTestimonial = () => {
      goToTestimonial(currentTestimonialIndex - 1);
    };

    // Event Listeners
    if (testimonialPrevBtn) {
      testimonialPrevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoSlide();
      });
    }

    if (testimonialNextBtn) {
      testimonialNextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoSlide();
      });
    }

    // Auto Slide every 5 seconds
    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        nextTestimonial();
      }, 5000);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    // Pause on hover
    if (testimonialCard) {
      testimonialCard.addEventListener('mouseenter', stopAutoSlide);
      testimonialCard.addEventListener('mouseleave', startAutoSlide);
    }

    // Swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    if (testimonialCard) {
      testimonialCard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      testimonialCard.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    const handleSwipe = () => {
      const swipeThreshold = 35;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextTestimonial();
        resetAutoSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevTestimonial();
        resetAutoSlide();
      }
    };

    // Start auto slide
    startAutoSlide();
  }

  /**
   * ==========================================================================
   * 10. STUDENT WORKS MODULE
   * Structured data array for student projects supported by the foundation.
   * Admin friendly: To add a new project, simply append a new object to
   * the studentProjectsData array below.
   * ==========================================================================
   */
  const studentProjectsData = [
    {
      id: 1,
      studentName: 'Havyaas',
      projectTitle: 'Gym Web Application',
      category: 'Web Application',
      description: 'A modern web application developed by Havyaas for gym management, fitness tracking, and workout scheduling.',
      projectLink: 'https://drive.google.com/file/d/1D8U7Z4h17Oe0vQsCjul_R0nkdhgI41Dm/view?usp=sharing',
      buttonText: 'Open Website',
      status: 'Completed'
    },
    {
      id: 2,
      studentName: 'Sahana',
      projectTitle: 'HealthMeta AI',
      category: 'AI Web Application',
      description: 'An AI-powered health monitoring application developed by Sahana using Google AI Studio to monitor health metrics, wellness indicators, and deliver intelligent health insights.',
      projectLink: 'https://ai.studio/apps/199d1519-7a35-489f-92d4-d7a825b87301',
      buttonText: 'Open Website',
      status: 'Completed'
    },
    {
      id: 3,
      studentName: 'Jyothi',
      projectTitle: 'Student Attendance Tracker',
      category: 'Web Application',
      description: 'A web application developed by Jyothi using Google AI Studio for efficiently tracking, recording, and managing student attendance.',
      projectLink: 'https://ai.studio/apps/d35c2244-d888-46e9-b2f4-27048182cf73',
      buttonText: 'Open Website',
      status: 'Completed'
    }
  ];

  const projectsGrid = document.getElementById('projects-grid');
  const projectSearchInput = document.getElementById('project-search-input');
  const projectSearchClearBtn = document.getElementById('project-search-clear-btn');
  const projectsCountBadge = document.getElementById('projects-count-badge');
  const projectsNoResultsEl = document.getElementById('projects-no-results');
  const resetProjectSearchBtn = document.getElementById('reset-project-search-btn');

  if (projectsGrid) {
    // Helper to return category SVG icon
    const getCategoryIcon = (category) => {
      if (category.toLowerCase().includes('ai')) {
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`;
      } else if (category.toLowerCase().includes('web')) {
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
      } else {
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
      }
    };

    const renderProjects = (list) => {
      projectsGrid.innerHTML = '';

      if (list.length === 0) {
        if (projectsNoResultsEl) projectsNoResultsEl.style.display = 'block';
        if (projectsCountBadge) projectsCountBadge.textContent = '0 Projects Found';
        return;
      }

      if (projectsNoResultsEl) projectsNoResultsEl.style.display = 'none';
      if (projectsCountBadge) {
        projectsCountBadge.textContent = `Showing ${list.length} ${list.length === 1 ? 'Project' : 'Projects'}`;
      }

      list.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';

        const categoryIconHtml = getCategoryIcon(project.category);

        card.innerHTML = `
          <div class="project-card-header">
            <span class="project-category-badge">
              ${categoryIconHtml}
              ${project.category}
            </span>
            <span class="project-status-badge">
              <span class="status-dot"></span>
              ${project.status}
            </span>
          </div>

          <div class="project-card-body">
            <h3 class="project-title">${project.projectTitle}</h3>
            
            <div class="project-author">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Student: <strong>${project.studentName}</strong></span>
            </div>

            <p class="project-description">${project.description}</p>
          </div>

          <div class="project-card-footer">
            <a 
              href="${project.projectLink}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-view-project"
            >
              <span>${project.buttonText}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        `;

        projectsGrid.appendChild(card);
      });
    };

    // Initial render
    renderProjects(studentProjectsData);

    // Filter Logic
    const handleProjectSearch = () => {
      const query = projectSearchInput.value.toLowerCase().trim();
      if (projectSearchClearBtn) {
        projectSearchClearBtn.style.display = query.length > 0 ? 'block' : 'none';
      }

      const filtered = studentProjectsData.filter(project => {
        return (
          project.studentName.toLowerCase().includes(query) ||
          project.projectTitle.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
        );
      });

      renderProjects(filtered);
    };

    if (projectSearchInput) {
      projectSearchInput.addEventListener('input', handleProjectSearch);
    }

    if (projectSearchClearBtn) {
      projectSearchClearBtn.addEventListener('click', () => {
        projectSearchInput.value = '';
        handleProjectSearch();
        projectSearchInput.focus();
      });
    }

    if (resetProjectSearchBtn) {
      resetProjectSearchBtn.addEventListener('click', () => {
        projectSearchInput.value = '';
        handleProjectSearch();
        projectSearchInput.focus();
      });
    }
  }
});
