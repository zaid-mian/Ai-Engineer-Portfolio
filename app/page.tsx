
"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // --- Loader ---
    const loaderWrapper = document.getElementById("loaderWrapper");
    const loaderBar = document.getElementById("loaderBar");
    const loaderText = document.getElementById("loaderText");
    let progress = 0;

    const loaderTexts = [
      "Initializing...",
      "Loading dependencies...",
      "Configuring environment...",
      "Starting server...",
      "Ready!",
    ];
    let textIndex = 0;

    const updateLoader = () => {
      if (loaderBar && loaderText && loaderWrapper) {
        if (progress <= 100) {
          loaderBar.style.width = `${progress}%`;
          if (progress >= (textIndex + 1) * 20 && textIndex < loaderTexts.length - 1) {
            textIndex++;
            loaderText.textContent = loaderTexts[textIndex];
          }
          progress += 2;
          setTimeout(updateLoader, 30);
        } else {
          setTimeout(() => {
            loaderWrapper.classList.add("done");
            initAnimations();
          }, 600);
        }
      }
    };

    updateLoader();

    function initAnimations() {
      // --- Navigation Scroll Effect ---
      const navbar = document.getElementById("navbar");
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link[data-section]");

      window.addEventListener("scroll", () => {
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        }

        let current = "";
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id") || "";
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-section") === current) {
            link.classList.add("active");
          }
        });
      });

      // --- Mobile Menu ---
      const hamburger = document.getElementById("hamburger");
      const navLinksContainer = document.getElementById("navLinks");

      hamburger?.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navLinksContainer?.classList.toggle("open");
      });

      navLinksContainer?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinksContainer?.classList.remove("open");
          hamburger?.classList.remove("open");
        });
      });

      // --- Custom Cursor ---
      const cursorOuter = document.getElementById("cursorOuter");
      const cursorInner = document.getElementById("cursorInner");

      let mouseX = 0, mouseY = 0;
      let outerX = 0, outerY = 0;

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorInner) {
          cursorInner.style.left = `${mouseX}px`;
          cursorInner.style.top = `${mouseY}px`;
        }
      });

      const animateCursor = () => {
        outerX += (mouseX - outerX) * 0.1;
        outerY += (mouseY - outerY) * 0.1;
        if (cursorOuter) {
          cursorOuter.style.left = `${outerX}px`;
          cursorOuter.style.top = `${outerY}px`;
        }
        requestAnimationFrame(animateCursor);
      };
      animateCursor();

      const cursorTargets = document.querySelectorAll("a, button, .project-card, .service-card, .skill-card");
      cursorTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => {
          cursorOuter?.classList.add("hovered");
          cursorInner?.classList.add("hovered");
        });
        target.addEventListener("mouseleave", () => {
          cursorOuter?.classList.remove("hovered");
          cursorInner?.classList.remove("hovered");
        });
      });

      // --- Stats Counter ---
      const statNums = document.querySelectorAll(".stat-num[data-target]");
      let statsAnimated = false;

      const animateStats = () => {
        if (statsAnimated) return;
        const heroSection = document.getElementById("home");
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            statsAnimated = true;
            statNums.forEach((stat) => {
              const target = parseInt((stat as HTMLElement).dataset.target || "0");
              let current = 0;
              const increment = target / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  (stat as HTMLElement).textContent = String(target);
                  clearInterval(timer);
                } else {
                  (stat as HTMLElement).textContent = String(Math.ceil(current));
                }
              }, 30);
            });
          }
        }
      };
      window.addEventListener("scroll", animateStats);
      animateStats();

      // --- Scroll Reveal ---
      const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              // Animate skill bars when in view
              if (entry.target.classList.contains("skill-card")) {
                const bar = entry.target.querySelector(".skill-bar");
                if (bar) {
                  const width = (bar as HTMLElement).dataset.width || "0";
                  (bar as HTMLElement).style.width = `${width}%`;
                }
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      revealElements.forEach((el) => revealObserver.observe(el));

      // --- Skill Tabs ---
      const skillTabs = document.querySelectorAll(".skill-tab[data-category]");
      const skillCards = document.querySelectorAll(".skill-card[data-category]");
      skillTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const category = (tab as HTMLElement).dataset.category || "all";
          skillTabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          skillCards.forEach((card) => {
            if (category === "all" || (card as HTMLElement).dataset.category === category) {
              card.classList.remove("hidden");
            } else {
              card.classList.add("hidden");
            }
          });
        });
      });

      // --- Project Filters ---
      const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
      const projectCards = document.querySelectorAll(".project-card[data-category]");
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = (btn as HTMLElement).dataset.filter || "all";
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          projectCards.forEach((card) => {
            const cardCategories = (card as HTMLElement).dataset.category || "";
            if (filter === "all" || cardCategories.includes(filter)) {
              card.classList.remove("hidden");
            } else {
              card.classList.add("hidden");
            }
          });
        });
      });

      // --- Contact Form ---
      const form = document.getElementById("contactForm") as HTMLFormElement | null;
      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const btnLoader = document.querySelector(".btn-loader");
        const formSuccess = document.querySelector(".form-success");
        if (btnLoader) {
          (btnLoader as HTMLElement).style.display = "block";
        }
        setTimeout(() => {
          if (btnLoader) {
            (btnLoader as HTMLElement).style.display = "none";
          }
          if (formSuccess) {
            (formSuccess as HTMLElement).classList.add("show");
          }
          form?.reset();
          setTimeout(() => {
            if (formSuccess) {
              (formSuccess as HTMLElement).classList.remove("show");
            }
          }, 5000);
        }, 1500);
      });
    }
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-outer" id="cursorOuter"></div>
      <div className="cursor-inner" id="cursorInner"></div>

      {/* Loader */}
      <div className="loader-wrapper" id="loaderWrapper">
        <div className="loader-content">
          <div className="loader-logo">
            <span className="loader-bracket">&lt;</span>
            <span className="loader-name">AI</span>
            <span className="loader-bracket">/&gt;</span>
          </div>
          <div className="loader-bar-wrap">
            <div className="loader-bar" id="loaderBar"></div>
          </div>
          <p className="loader-text" id="loaderText">Initializing...</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <span className="bracket">&lt;</span>
            <span className="logo-text">Dev</span>
            <span className="bracket">/&gt;</span>
          </a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home" className="nav-link active" data-section="home">Home</a></li>
            <li><a href="#about" className="nav-link" data-section="about">About</a></li>
            <li><a href="#what-i-do" className="nav-link" data-section="what-i-do">Services</a></li>
            <li><a href="#skills" className="nav-link" data-section="skills">Skills</a></li>
            <li><a href="#projects" className="nav-link" data-section="projects">Projects</a></li>
            <li><a href="#education" className="nav-link" data-section="education">Education</a></li>
            <li><a href="#contact" className="nav-link" data-section="contact">Contact</a></li>
          </ul>
          <button className="nav-cta" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            <span>Hire Me</span>
            <i className="fas fa-arrow-right"></i>
          </button>
          <button className="hamburger" id="hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div id="particles-js"></div>
        <canvas id="heroCanvas"></canvas>

        {/* Glowing orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Grid lines */}
        <div className="hero-grid"></div>

        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Available for Work</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-greeting">Hello, I'm</span>
              <span className="hero-name">
                <span className="name-char">M</span><span className="name-char">u</span><span className="name-char">h</span><span className="name-char">a</span><span className="name-char">m</span><span className="name-char">m</span><span className="name-char">a</span><span className="name-char">d</span>
                <span className="name-char">&nbsp;</span>
                <span className="name-char name-highlight">Z</span><span className="name-char name-highlight">a</span><span className="name-char name-highlight">i</span><span className="name-char name-highlight">d</span>
              </span>
              <span className="hero-role">
                <span className="role-prefix">I'm a </span>
                <span id="typedText" className="typed-highlight">AI Engineer</span>
              </span>
            </h1>

            <p className="hero-desc">
              Creating intelligent AI products that learn, reason, and automate. Focused on <span className="text-accent">Machine Learning</span>, <span className="text-accent">Agentic AI</span>, <span className="text-accent">LangChain</span>, <span className="text-accent">RAG Systems</span>, and <span className="text-accent">full-stack AI applications</span> built for real-world impact.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num" data-target="20">0</span><span className="stat-plus">+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num" data-target="2">0</span><span className="stat-plus">+</span>
                <span className="stat-label">Years Exp</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <i className="fas fa-rocket"></i>
              </a>
              <a href="#contact" className="btn-outline">
                <span>Let's Talk</span>
                <i className="fas fa-comments"></i>
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/zaid-mian" target="_blank" className="social-icon" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/muhammad-zaid-tahir-3a6160362/" target="_blank" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image-wrapper">
              {/* Rotating rings */}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
              {/* Tech orbit icons */}
              <div className="orbit-icon orbit-icon-1"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /></div>
              <div className="orbit-icon orbit-icon-2"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /></div>
              <div className="orbit-icon orbit-icon-3"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" /></div>
              <div className="orbit-icon orbit-icon-4"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" /></div>
              <div className="hero-photo-container">
                <div className="photo-glow"></div>
                <img src="/zaid.png" alt="Muhammad Zaid - AI Engineer" className="hero-photo" />
              </div>
              {/* Floating code card */}
              <div className="floating-card card-code">
                <div className="card-dot red"></div>
                <div className="card-dot yellow"></div>
                <div className="card-dot green"></div>
                <code className="code-snippet">LangChain + RAG</code>
              </div>
              {/* Floating metric card */}
              <div className="floating-card card-metric">
                <div className="metric-icon"><i className="fas fa-brain"></i></div>
                <div className="metric-info">
                  <span className="metric-val">98.7%</span>
                  <span className="metric-lbl">Model Accuracy</span>
                </div>
              </div>
              {/* AI badge */}
              <div className="floating-card card-ai">
                <i className="fas fa-microchip"></i>
                <span>AI/ML Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about section" id="about">
        <div className="section-bg-pattern"></div>
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Get To Know Me</span>
            <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
            <div className="section-line"></div>
          </div>

          <div className="about-grid">
            <div className="about-visual reveal-left">
              <div className="about-img-wrapper">
                <div className="about-img-bg"></div>
                <img src="/zaid.png" alt="About Muhammad Zaid" className="about-img" />
                <div className="about-exp-badge">
                  <span className="exp-num">3+</span>
                  <span className="exp-text">Years of<br/>Experience</span>
                </div>
              </div>
              <div className="about-info-cards">
                <div className="info-card">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Faisalabad</span>
                </div>
                <div className="info-card">
                  <i className="fas fa-graduation-cap"></i>
                  <span>B. S Computer Science</span>
                </div>
              </div>
            </div>

            <div className="about-content reveal-right">
              <h3 className="about-heading">
                Passionate AI Engineer building the <span className="text-gradient">future</span> with code.
              </h3>
              <p className="about-text">
                AI Engineer focused on building AI agents, chatbots, and LLM-powered applications using modern machine learning technologies.
              </p>
              <p className="about-text">
                I specialize in designing Agentic AI systems and Retrieval-Augmented Generation (RAG) pipelines using frameworks like LangChain, along with other LLM tooling.
              </p>
              <p className="about-text">
                My primary focus is developing AI applications that combine model intelligence with practical software engineering, including backend APIs, automation systems, and deployed AI products.
              </p>
              <p className="about-text">
                I also build full-stack AI-powered applications where AI models are integrated into complete end-to-end systems with frontend interfaces and scalable backend architecture.
              </p>
              <p className="about-text">
                My goal is to create production-ready AI solutions that transform machine learning models into usable, real-world applications.
              </p>

              <div className="about-tags">
                <span className="tag">🤖 Machine Learning</span>
                <span className="tag">⛓️ LangChain</span>
                <span className="tag">� RAG</span>
                <span className="tag">🤖 AI Power Application</span>
                <span className="tag">🧠 Deep Learning</span>
                <span className="tag">🤖 Autonomus Agent</span>
              </div>

              <div className="about-actions">
                <a href="/M.zaid resume.pdf" download className="btn-primary">
                  <i className="fas fa-download"></i>
                  <span>Download CV</span>
                </a>
                <div className="about-contact-links">
                  <a href="mailto:mianzaid049@gmail.com" className="contact-link"><i className="fas fa-envelope"></i></a>
                  <a href="https://www.linkedin.com/in/muhammad-zaid-tahir-3a6160362/" target="_blank" className="contact-link"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://github.com/zaid-mian" target="_blank" className="contact-link"><i className="fab fa-github"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="what-i-do section" id="what-i-do">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">My Expertise</span>
            <h2 className="section-title">What I <span className="text-gradient">Do</span></h2>
            <div className="section-line"></div>
            <p className="section-subtitle">I specialize in building end-to-end AI solutions from research to production deployment.</p>
          </div>

          <div className="services-grid">
            <div className="service-card reveal-up">
              <div className="service-icon-wrap">
                <div className="service-icon-bg"></div>
                <i className="fas fa-robot service-icon"></i>
              </div>
              <h3 className="service-title">AI & Agentic Systems</h3>
              <p className="service-desc">Build autonomous AI agents, intelligent chatbots, and workflow automation systems using LangChain, RAG architectures, and modern LLM frameworks.</p>
              <ul className="service-list">
                <li><i className="fas fa-check"></i> AI Agents</li>
                <li><i className="fas fa-check"></i> LangChain</li>
                <li><i className="fas fa-check"></i> RAG Pipelines</li>
                <li><i className="fas fa-check"></i> Chatbot Development</li>
              </ul>
              <div className="service-number">01</div>
            </div>

            <div className="service-card reveal-up" data-delay="0.1">
              <div className="service-icon-wrap">
                <div className="service-icon-bg"></div>
                <i className="fas fa-brain service-icon"></i>
              </div>
              <h3 className="service-title">Machine Learning</h3>
              <p className="service-desc">Develop machine learning solutions for prediction, classification, and intelligent decision-making through data-driven models and modern ML techniques.</p>
              <ul className="service-list">
                <li><i className="fas fa-check"></i> Predictive Modeling</li>
                <li><i className="fas fa-check"></i> Model Training</li>
                <li><i className="fas fa-check"></i> Data Processing</li>
                <li><i className="fas fa-check"></i> Model Evaluation</li>
              </ul>
              <div className="service-number">02</div>
            </div>

            <div className="service-card reveal-up" data-delay="0.2">
              <div className="service-icon-wrap">
                <div className="service-icon-bg"></div>
                <i className="fas fa-code service-icon"></i>
              </div>
              <h3 className="service-title">Full-Stack AI Applications</h3>
              <p className="service-desc">Build end-to-end AI products by combining modern frontend technologies with scalable backend systems, databases, APIs, and LLM integrations to deliver real-world intelligent solutions.</p>
              <ul className="service-list">
                <li><i className="fas fa-check"></i> React & Next.js</li>
                <li><i className="fas fa-check"></i> FastAPI & APIs</li>
                <li><i className="fas fa-check"></i> Database Integration</li>
                <li><i className="fas fa-check"></i> AI-Powered Products</li>
              </ul>
              <div className="service-number">03</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Technical Arsenal</span>
            <h2 className="section-title">My <span className="text-gradient">Skills</span></h2>
            <div className="section-line"></div>
            <p className="section-subtitle">Technologies and tools I use to build AI agents, machine learning solutions, and full-stack AI applications.</p>
          </div>

          <div className="skills-layout">
            {/* Skill Category Tabs */}
            <div className="skill-tabs reveal-up">
              <button className="skill-tab active" data-category="all">All</button>
              <button className="skill-tab" data-category="ai">AI & ML</button>
              <button className="skill-tab" data-category="frameworks">AI Frameworks & Tools</button>
              <button className="skill-tab" data-category="backend">Backend</button>
              <button className="skill-tab" data-category="frontend">Frontend</button>
              <button className="skill-tab" data-category="databases">Databases</button>
              <button className="skill-tab" data-category="tools">Tools</button>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid" id="skillsGrid">
              {/* AI & ML */}
              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-brain"></i>
                </div>
                <span className="skill-name">Machine Learning</span>
              </div>

              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-network-wired"></i>
                </div>
                <span className="skill-name">Deep Learning</span>
              </div>

              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-magic"></i>
                </div>
                <span className="skill-name">Generative AI</span>
              </div>

              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-robot"></i>
                </div>
                <span className="skill-name">Agentic AI</span>
              </div>

              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-search"></i>
                </div>
                <span className="skill-name">RAG</span>
              </div>

              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-comments"></i>
                </div>
                <span className="skill-name">Prompt Engineering</span>
              </div>

              <div className="skill-card reveal-up" data-category="ai">
                <div className="skill-icon-wrap">
                  <i className="fas fa-language"></i>
                </div>
                <span className="skill-name">LLM Applications</span>
              </div>

              {/* AI Frameworks & Tools */}
              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap skill-icon-text">🦜</div>
                <span className="skill-name">LangChain</span>
              </div>

              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap">
                  <i className="fas fa-robot"></i>
                </div>
                <span className="skill-name">OpenAI API</span>
              </div>

              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap">
                  <img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="HuggingFace" style={{ filter: "none" }} />
                </div>
                <span className="skill-name">Hugging Face</span>
              </div>

              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap skill-icon-text">🦙</div>
                <span className="skill-name">Ollama</span>
              </div>

              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit-learn" style={{ filter: "none" }} />
                </div>
                <span className="skill-name">Scikit-learn</span>
              </div>

              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" />
                </div>
                <span className="skill-name">Pandas</span>
              </div>

              <div className="skill-card reveal-up" data-category="frameworks">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" />
                </div>
                <span className="skill-name">NumPy</span>
              </div>

              {/* Backend */}
              <div className="skill-card reveal-up" data-category="backend">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                </div>
                <span className="skill-name">Python</span>
              </div>

              <div className="skill-card reveal-up" data-category="backend">
                <div className="skill-icon-wrap skill-icon-text">⚡</div>
                <span className="skill-name">FastAPI</span>
              </div>

              <div className="skill-card reveal-up" data-category="backend">
                <div className="skill-icon-wrap">
                  <i className="fas fa-server"></i>
                </div>
                <span className="skill-name">REST APIs</span>
              </div>

              <div className="skill-card reveal-up" data-category="backend">
                <div className="skill-icon-wrap">
                  <i className="fas fa-key"></i>
                </div>
                <span className="skill-name">Authentication</span>
              </div>

              <div className="skill-card reveal-up" data-category="backend">
                <div className="skill-icon-wrap">
                  <i className="fas fa-plug"></i>
                </div>
                <span className="skill-name">API Integration</span>
              </div>

              {/* Frontend */}
              <div className="skill-card reveal-up" data-category="frontend">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                </div>
                <span className="skill-name">React</span>
              </div>

              <div className="skill-card reveal-up" data-category="frontend">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                </div>
                <span className="skill-name">Next.js</span>
              </div>

              <div className="skill-card reveal-up" data-category="frontend">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                </div>
                <span className="skill-name">TypeScript</span>
              </div>

              <div className="skill-card reveal-up" data-category="frontend">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" />
                </div>
                <span className="skill-name">Tailwind CSS</span>
              </div>

              <div className="skill-card reveal-up" data-category="frontend">
                <div className="skill-icon-wrap skill-icon-text">🎨</div>
                <span className="skill-name">shadcn/ui</span>
              </div>

              {/* Databases */}
              <div className="skill-card reveal-up" data-category="databases">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                </div>
                <span className="skill-name">PostgreSQL</span>
              </div>

              <div className="skill-card reveal-up" data-category="databases">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                </div>
                <span className="skill-name">MySQL</span>
              </div>

              <div className="skill-card reveal-up" data-category="databases">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                </div>
                <span className="skill-name">MongoDB</span>
              </div>

              <div className="skill-card reveal-up" data-category="databases">
                <div className="skill-icon-wrap">
                  <i className="fas fa-database"></i>
                </div>
                <span className="skill-name">SQLite</span>
              </div>

              <div className="skill-card reveal-up" data-category="databases">
                <div className="skill-icon-wrap skill-icon-text">📊</div>
                <span className="skill-name">Vector Databases</span>
              </div>

              {/* Tools */}
              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                </div>
                <span className="skill-name">Git</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap">
                  <i className="fab fa-github"></i>
                </div>
                <span className="skill-name">GitHub</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap skill-icon-text">📮</div>
                <span className="skill-name">Postman</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
                </div>
                <span className="skill-name">VS Code</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap skill-icon-text">⌨️</div>
                <span className="skill-name">Cursor</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap skill-icon-text">🥒</div>
                <span className="skill-name">Pickle</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap skill-icon-text">🎈</div>
                <span className="skill-name">Streamlit</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap skill-icon-text">🚀</div>
                <span className="skill-name">Antigravity</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                </div>
                <span className="skill-name">Docker</span>
              </div>

              <div className="skill-card reveal-up" data-category="tools">
                <div className="skill-icon-wrap">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" />
                </div>
                <span className="skill-name">Linux</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects section" id="projects">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
            <div className="section-line"></div>
            <p className="section-subtitle">A showcase of AI Agents, RAG Systems, and Full-Stack AI Solutions.</p>
          </div>

          {/* Filter Buttons */}
          <div className="project-filters reveal-up">
            <button className="filter-btn active" data-filter="all">All</button>
            <button className="filter-btn" data-filter="ai-agents">AI Agents</button>
            <button className="filter-btn" data-filter="llm-apps">LLM Applications</button>
            <button className="filter-btn" data-filter="full-stack-ai">Full-Stack AI</button>
            <button className="filter-btn" data-filter="ml">Machine Learning</button>
            <button className="filter-btn" data-filter="cv">Computer Vision</button>
          </div>

          <div className="projects-grid" id="projectsGrid">
            {/* ReviewAI – Featured Project */}
            <article className="project-card reveal-up featured-project" data-category="full-stack-ai llm-apps">
              <div className="project-featured-badge">⭐ Featured</div>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <div className="project-placeholder" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                  <i className="fas fa-comments"></i>
                </div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">FastAPI</span>
                  <span className="proj-tag">React</span>
                  <span className="proj-tag">PyTorch</span>
                  <span className="proj-tag">FAISS</span>
                  <span className="proj-tag">Gemini</span>
                </div>
                <h3 className="project-title">ReviewAI – Next-Gen Sentiment Intelligence Suite</h3>
                <p className="project-desc">An enterprise-grade AI platform that transforms customer feedback into actionable business insights using fine-tuned BERT models, FAISS vector search, semantic retrieval, intent classification, and Gemini-powered analysis.</p>
                <div className="project-meta">
                  <span className="project-stat"><i className="fas fa-star"></i> 1.5k Stars</span>
                  <span className="project-stat"><i className="fas fa-code-branch"></i> 300 Forks</span>
                </div>
              </div>
            </article>

            {/* LangChain Multi-Agent Research System */}
            <article className="project-card reveal-up" data-category="ai-agents">
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <div className="project-placeholder" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                  <i className="fas fa-robot"></i>
                </div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">LangChain</span>
                  <span className="proj-tag">Gemini</span>
                  <span className="proj-tag">Tavily</span>
                  <span className="proj-tag">Streamlit</span>
                </div>
                <h3 className="project-title">LangChain Multi-Agent Research System</h3>
                <p className="project-desc">A multi-agent research platform that autonomously researches topics, gathers information from the web, generates structured reports, and evaluates report quality through specialized AI agents.</p>
                <div className="project-meta">
                  <span className="project-stat"><i className="fas fa-star"></i> 980 Stars</span>
                  <span className="project-stat"><i className="fas fa-code-branch"></i> 180 Forks</span>
                </div>
              </div>
            </article>

            {/* AI Chatbot with LangGraph & FastAPI */}
            <article className="project-card reveal-up" data-category="ai-agents">
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <div className="project-placeholder" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
                  <i className="fas fa-comments"></i>
                </div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">LangGraph</span>
                  <span className="proj-tag">LangChain</span>
                  <span className="proj-tag">FastAPI</span>
                  <span className="proj-tag">Groq</span>
                </div>
                <h3 className="project-title">AI Chatbot with LangGraph & FastAPI</h3>
                <p className="project-desc">An AI-powered chatbot built with LangGraph and LangChain featuring multi-model support, agent workflows, optional web search, and a FastAPI backend with Streamlit frontend.</p>
                <div className="project-meta">
                  <span className="project-stat"><i className="fas fa-star"></i> 750 Stars</span>
                  <span className="project-stat"><i className="fas fa-code-branch"></i> 120 Forks</span>
                </div>
              </div>
            </article>

            {/* AI Communication Coach */}
            <article className="project-card reveal-up" data-category="llm-apps cv">
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <div className="project-placeholder" style={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }}>
                  <i className="fas fa-microphone"></i>
                </div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">Flask</span>
                  <span className="proj-tag">Whisper</span>
                  <span className="proj-tag">MediaPipe</span>
                  <span className="proj-tag">DistilBERT</span>
                </div>
                <h3 className="project-title">AI Communication Coach</h3>
                <p className="project-desc">A multi-modal AI coaching system that analyzes speech clarity, filler words, body language, and sentiment in real-time using computer vision and natural language processing.</p>
                <div className="project-meta">
                  <span className="project-stat"><i className="fas fa-star"></i> 520 Stars</span>
                  <span className="project-stat"><i className="fas fa-code-branch"></i> 85 Forks</span>
                </div>
              </div>
            </article>

            {/* Elder Care AI Companion System */}
            <article className="project-card reveal-up" data-category="cv">
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <div className="project-placeholder" style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
                  <i className="fas fa-heart"></i>
                </div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">OpenCV</span>
                  <span className="proj-tag">MediaPipe</span>
                  <span className="proj-tag">Twilio</span>
                  <span className="proj-tag">Speech Recognition</span>
                </div>
                <h3 className="project-title">Elder Care AI Companion System</h3>
                <p className="project-desc">An autonomous safety monitoring and voice companion system that detects falls, provides health reminders, and automatically alerts caregivers during emergencies.</p>
                <div className="project-meta">
                  <span className="project-stat"><i className="fas fa-star"></i> 450 Stars</span>
                  <span className="project-stat"><i className="fas fa-code-branch"></i> 70 Forks</span>
                </div>
              </div>
            </article>

            {/* MediBot AI */}
            <article className="project-card reveal-up" data-category="llm-apps">
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <div className="project-placeholder" style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" }}>
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">Flask</span>
                  <span className="proj-tag">Gemini API</span>
                  <span className="proj-tag">SQLite</span>
                </div>
                <h3 className="project-title">MediBot AI</h3>
                <p className="project-desc">A localized medical AI assistant that combines Gemini reasoning with healthcare resources, hospital discovery, medicine lookup, and symptom analysis.</p>
                <div className="project-meta">
                  <span className="project-stat"><i className="fas fa-star"></i> 380 Stars</span>
                  <span className="project-stat"><i className="fas fa-code-branch"></i> 55 Forks</span>
                </div>
              </div>
            </article>
          </div>

          <div className="projects-cta reveal-up">
            <a href="https://github.com/zaid-mian" target="_blank" className="btn-outline">
              <i className="fab fa-github"></i>
              <span>View All on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education section" id="education">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">My Journey</span>
            <h2 className="section-title">Education & <span className="text-gradient">Experience</span></h2>
            <div className="section-line"></div>
          </div>

          <div className="timeline-wrapper">
            {/* Left: Education */}
            <div className="timeline-col reveal-left">
              <h3 className="timeline-col-title">
                <i className="fas fa-graduation-cap"></i> Education
              </h3>

              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2021 – 2023</div>
                    <h4 className="timeline-title">M.S. in Computer Science</h4>
                    <span className="timeline-org">Stanford University</span>
                    <p className="timeline-desc">Specialized in Artificial Intelligence and Machine Learning. Thesis: "Efficient Fine-tuning of Large Language Models using Parameter-Efficient Methods."</p>
                    <div className="timeline-tags">
                      <span>GPA: 3.9/4.0</span>
                      <span>AI Specialization</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2017 – 2021</div>
                    <h4 className="timeline-title">B.E. in Computer Engineering</h4>
                    <span className="timeline-org">MIT — Massachusetts Institute of Technology</span>
                    <p className="timeline-desc">Foundation in algorithms, data structures, and software engineering. Participated in 3 hackathons, winning 2 first-place awards.</p>
                    <div className="timeline-tags">
                      <span>GPA: 3.8/4.0</span>
                      <span>Dean's List</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Experience */}
            <div className="timeline-col reveal-right">
              <h3 className="timeline-col-title">
                <i className="fas fa-briefcase"></i> Experience
              </h3>

              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2023 – Present</div>
                    <h4 className="timeline-title">Senior AI Engineer</h4>
                    <span className="timeline-org">OpenAI — San Francisco, CA</span>
                    <p className="timeline-desc">Working on advanced LLM optimization and inference efficiency. Contributed to model improvements used by millions of users.</p>
                    <div className="timeline-tags">
                      <span>LLMs</span>
                      <span>Distributed Systems</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2021 – 2023</div>
                    <h4 className="timeline-title">AI/ML Engineer</h4>
                    <span className="timeline-org">Google DeepMind</span>
                    <p className="timeline-desc">Developed state-of-the-art computer vision models for autonomous systems. Worked on model compression techniques.</p>
                    <div className="timeline-tags">
                      <span>Computer Vision</span>
                      <span>Model Optimization</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2019 – 2021</div>
                    <h4 className="timeline-title">ML Intern</h4>
                    <span className="timeline-org">Meta AI</span>
                    <p className="timeline-desc">Built recommendation systems improving user engagement by 15%. Worked on large-scale data pipelines.</p>
                    <div className="timeline-tags">
                      <span>Recommendations</span>
                      <span>Data Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="certs-section">
            <h3 className="certs-title">Certifications</h3>
            <div className="certs-grid">
              <div className="cert-card reveal-up">
                <div className="cert-icon"><i className="fab fa-aws"></i></div>
                <div className="cert-name">AWS Machine Learning - Specialty</div>
                <div className="cert-issuer">Amazon Web Services</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.1">
                <div className="cert-icon"><i className="fas fa-certificate"></i></div>
                <div className="cert-name">TensorFlow Developer Certificate</div>
                <div className="cert-issuer">Google</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.2">
                <div className="cert-icon"><i className="fab fa-google"></i></div>
                <div className="cert-name">Professional Machine Learning Engineer</div>
                <div className="cert-issuer">Google Cloud</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.3">
                <div className="cert-icon"><i className="fab fa-microsoft"></i></div>
                <div className="cert-name">Azure AI Engineer Associate</div>
                <div className="cert-issuer">Microsoft</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section" id="contact">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>
            <div className="section-line"></div>
          </div>

          <div className="contact-layout">
            <div className="contact-info reveal-left">
              <h3 className="contact-heading">
                Have a project in mind? <br />
                Let's build something <span className="text-gradient">amazing</span> together.
              </h3>
              <p className="contact-text">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the platforms below.
              </p>

              <div className="contact-cards">
                <a href="mailto:hello@alexraj.dev" className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-val">hello@alexraj.dev</span>
                  </div>
                  <div className="contact-card-arrow"><i className="fas fa-arrow-right"></i></div>
                </a>

                <a href="#" className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">Location</span>
                    <span className="contact-card-val">San Francisco, CA</span>
                  </div>
                  <div className="contact-card-arrow"><i className="fas fa-arrow-right"></i></div>
                </a>

                <a href="#" className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">Phone</span>
                    <span className="contact-card-val">+1 (415) 555-0198</span>
                  </div>
                  <div className="contact-card-arrow"><i className="fas fa-arrow-right"></i></div>
                </a>
              </div>

              <div className="contact-socials">
                <a href="#" className="social-btn"><i className="fab fa-github"></i> GitHub</a>
                <a href="#" className="social-btn"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
                <a href="#" className="social-btn"><i className="fab fa-twitter"></i> Twitter/X</a>
                <a href="#" className="social-btn"><i className="fab fa-kaggle"></i> Kaggle</a>
              </div>
            </div>

            <div className="contact-form-wrap reveal-right">
              <form id="contactForm" className="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Project Discussion" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Tell me about your project..." required></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  <div className="btn-loader" style={{ display: "none" }}></div>
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
                <div className="form-success" style={{ display: "none" }}>
                  <i className="fas fa-check-circle"></i> Message sent successfully! I'll get back to you soon.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

