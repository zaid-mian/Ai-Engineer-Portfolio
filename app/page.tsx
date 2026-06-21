
"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [activeProjectFilter, setActiveProjectFilter] = useState("all");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I'm Muhammad Zaid's AI assistant! How can I help you learn about my work? 🤖"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const root = document.documentElement;
    if (newTheme) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "light");
    }
  };

  // Chatbot knowledge base
  const knowledgeBase = {
    name: "Muhammad Zaid",
    role: "AI Engineer",
    location: "Faisalabad, Pakistan",
    education: [
      "Bachelor of Science in Computer Science (BSCS) - University of Agriculture, Faisalabad (2023-2027) | CGPA: 3.3/4.0",
      "Intermediate (FSC) - KIPS College, Faisalabad (2021-2023)"
    ],
    experience: [
      "AI/ML Engineering Intern at Career Institute, Faisalabad (Jun 2025 - Aug 2025)",
      "Built classification and regression models with scikit-learn, pandas, NumPy",
      "Developed end-to-end ML pipelines with data preprocessing, feature engineering, and model evaluation"
    ],
    skills: {
      ai_ml: ["Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "RAG", "Prompt Engineering", "LLM Applications"],
      frameworks: ["LangChain", "OpenAI API", "Hugging Face", "Ollama", "Scikit-learn", "Pandas", "NumPy"],
      backend: ["Python", "FastAPI", "REST APIs", "Authentication", "API Integration"],
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      databases: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Vector Databases"],
      tools: ["Git", "GitHub", "Docker", "Linux", "Postman", "VS Code", "Cursor", "Pickle", "Streamlit"]
    },
    projects: [
      {
        name: "ReviewAI",
        category: "Full-Stack AI / LLM Applications",
        description: "Enterprise-grade AI platform that transforms customer feedback into actionable insights using BERT, FAISS, and Gemini.",
        tech: ["FastAPI", "React", "Tailwind CSS", "PyTorch", "Transformers", "FAISS", "Gemini"]
      },
      {
        name: "LangChain Multi-Agent Research System",
        category: "AI Agents",
        description: "Autonomous multi-agent research platform that researches topics and generates structured reports.",
        tech: ["LangChain", "Gemini", "Tavily", "Streamlit"]
      },
      {
        name: "AI Chatbot with LangGraph & FastAPI",
        category: "AI Agents",
        description: "AI chatbot with multi-model support, agent workflows, and web search integration.",
        tech: ["LangGraph", "LangChain", "OpenAI", "Groq", "FastAPI", "Streamlit"]
      },
      {
        name: "AI Communication Coach",
        category: "LLM Applications",
        description: "Multi-modal AI coaching system analyzing speech, body language, and sentiment.",
        tech: ["Python", "Flask", "Whisper", "MediaPipe", "DistilBERT"]
      },
      {
        name: "Elder Care AI Companion System",
        category: "Computer Vision",
        description: "Autonomous safety monitoring system that detects falls and alerts caregivers.",
        tech: ["Python", "OpenCV", "MediaPipe", "Twilio"]
      },
      {
        name: "MediBot AI",
        category: "LLM Applications",
        description: "Localized medical AI assistant combining Gemini reasoning with healthcare resources.",
        tech: ["Python", "Flask", "Gemini API", "SQLite"]
      }
    ],
    certificates: [
      "Machine Learning Specialization - Andrew Ng, DeepLearning.AI & Stanford University",
      "Python for Data Science, AI & Development - IBM",
      "Introduction to Artificial Intelligence - Google",
      "Artificial Intelligence - Career Institute (2025)",
      "Collaborate Effectively for Professional Success - IBM"
    ],
    contact: {
      email: "mianzaid049@gmail.com",
      linkedin: "https://www.linkedin.com/in/muhammad-zaid-tahir-3a6160362/",
      github: "https://github.com/zaid-mian",
      whatsapp: "https://wa.me/923295366074"
    }
  };

  // Generate bot response based on user input
  const generateBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("skill") || msg.includes("technology") || msg.includes("tech") || msg.includes("what can you do")) {
      return `
**Muhammad Zaid's Core Skills:**

**AI & Machine Learning:**
${knowledgeBase.skills.ai_ml.map(s => `• ${s}`).join("\n")}

**Frameworks & Tools:**
${knowledgeBase.skills.frameworks.map(s => `• ${s}`).join("\n")}

He specializes in **AI Agents, RAG systems, and LLM applications** using LangChain & LangGraph!
      `;
    }
    
    if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio")) {
      return `
**Featured Projects:**
${knowledgeBase.projects.map((p, i) => `**${i+1}. ${p.name}**\n${p.category}\n${p.description}`).join("\n\n")}

Want to know more about a specific project?
      `;
    }
    
    if (msg.includes("education") || msg.includes("degree") || msg.includes("university")) {
      return `
**Education:**
${knowledgeBase.education.map(e => `• ${e}`).join("\n")}
      `;
    }
    
    if (msg.includes("experience") || msg.includes("work experience") || msg.includes("intern")) {
      return `
**Experience:**
${knowledgeBase.experience.map(e => `• ${e}`).join("\n")}
      `;
    }
    
    if (msg.includes("resume") || msg.includes("cv")) {
      return "Great! You can download Muhammad Zaid's resume **[here](/M.zaid resume.pdf)**! Or check out his full portfolio above!";
    }
    
    if (msg.includes("hire") || msg.includes("contact") || msg.includes("email") || msg.includes("work with")) {
      return `Perfect! Let's connect! You can reach Muhammad Zaid via:\n\n• **Email:** mianzaid049@gmail.com\n• **LinkedIn:** ${knowledgeBase.contact.linkedin}\n• **GitHub:** ${knowledgeBase.contact.github}\n• **WhatsApp:** +92 329 5366074\n\nOr click the **\"Hire Me\"** button below to go to the contact section!`;
    }
    
    if (msg.includes("full stack") || msg.includes("fullstack") || msg.includes("frontend") || msg.includes("backend")) {
      return `
**Full-Stack Development Skills:**
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Python, FastAPI, REST APIs
• Databases: PostgreSQL, MongoDB, SQLite
• AI Integration: LLMs, LangChain, RAG

Muhammad Zaid builds complete **AI-powered applications** from frontend to backend!
      `;
    }
    
    if (msg.includes("ai") || msg.includes("ml") || msg.includes("llm") || msg.includes("langchain") || msg.includes("rag") || msg.includes("agent")) {
      return `
**AI/ML Specialization:**
• AI Agents & LangChain
• Retrieval-Augmented Generation (RAG)
• LLM Applications
• Machine Learning & Deep Learning

Muhammad Zaid focuses on building **production-ready AI solutions** with LangChain, LangGraph, and modern LLM frameworks!
      `;
    }
    
    if (msg.includes("who are you") || msg.includes("what are you")) {
      return "I'm Muhammad Zaid's AI assistant! I help recruiters and visitors learn about his AI/ML engineering skills, projects, and experience!";
    }
    
    return "I'm here to help! Ask me about Muhammad Zaid's **skills, projects, experience, or education**! Or use the quick buttons below!";
  };

  // Handle user message submission
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: "user", text: inputText }]);
    
    // Clear input
    const userMessage = inputText;
    setInputText("");
    
    // Add bot response after delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setMessages(prev => [...prev, { id: Date.now(), sender: "bot", text: botResponse }]);
    }, 500);
  };

  // Handle quick action buttons
  const handleQuickAction = (action: string) => {
    setIsChatOpen(true);
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: "user", text: action }]);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(action);
      setMessages(prev => [...prev, { id: Date.now(), sender: "bot", text: botResponse }]);
    }, 500);
  };

  // Handle Hire Me button
  const handleHireMe = () => {
    setIsChatOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    setIsLoading(true);
    setShowSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsLoading(false);
        setShowSuccess(true);
        form.reset();
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsLoading(false);
      alert(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  useEffect(() => {
    // Initialize dark theme by default
    const root = document.documentElement;
    if (isDarkTheme) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "light");
    }
  }, [isDarkTheme]);

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
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            style={{ marginRight: "15px" }}
          >
            <i className={isDarkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>
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
              <a
                href="https://wa.me/923295366074?text=Hi%20Muhammad%20Zaid,%20I'm%20interested%20in%20your%20AI/ML%20services!"
                target="_blank"
                className="btn-primary"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
                }}
              >
                <span>WhatsApp</span>
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/zaid-mian" target="_blank" className="social-icon" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/muhammad-zaid-tahir-3a6160362/" target="_blank" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://wa.me/923295366074?text=Hi%20Muhammad%20Zaid,%20I'm%20interested%20in%20your%20AI/ML%20services!" target="_blank" className="social-icon" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
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
                <img src="/about.png" alt="About Muhammad Zaid" className="about-img" />
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
              <div className={`about-text-expandable ${aboutExpanded ? "expanded" : ""}`}>
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
              </div>
              <button 
                className="read-more-btn" 
                onClick={() => setAboutExpanded(!aboutExpanded)}
              >
                {aboutExpanded ? "Read Less" : "Read More"}
              </button>

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
                <a href="https://wa.me/923295366074?text=Hi%20Muhammad%20Zaid,%20I'm%20interested%20in%20your%20AI/ML%20services!" target="_blank" className="contact-link"><i className="fab fa-whatsapp"></i></a>
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

          <div className="skills-container">
            {/* Core Expertise */}
            <div className="core-expertise-card reveal-up">
              <h3 className="core-expertise-title">Core Expertise</h3>
              
              <div className="skill-progress-item">
                <div className="skill-progress-header">
                  <span className="skill-progress-name">Python</span>
                  <span className="skill-progress-percent">95%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{width: '95%', background: 'linear-gradient(90deg, #6c63ff, #00d4ff)'}}></div>
                </div>
              </div>

              <div className="skill-progress-item">
                <div className="skill-progress-header">
                  <span className="skill-progress-name">AI/ML & GenAI</span>
                  <span className="skill-progress-percent">90%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{width: '90%', background: 'linear-gradient(90deg, #10b981, #34d399)'}}></div>
                </div>
              </div>

              <div className="skill-progress-item">
                <div className="skill-progress-header">
                  <span className="skill-progress-name">LangChain/LangGraph</span>
                  <span className="skill-progress-percent">88%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{width: '88%', background: 'linear-gradient(90deg, #f59e0b, #f97316)'}}></div>
                </div>
              </div>

              <div className="skill-progress-item">
                <div className="skill-progress-header">
                  <span className="skill-progress-name">RAG</span>
                  <span className="skill-progress-percent">88%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{width: '88%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)'}}></div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="tech-stack-card reveal-up">
              <h3 className="tech-stack-title">
                <i className="fas fa-bolt"></i> Technology Stack
              </h3>

              <div className="tech-stack-section">
                <div className="tech-stack-section-header">
                  <span className="tech-stack-dot" style={{background: '#ec4899'}}></span>
                  <span className="tech-stack-section-name">AI/ML Core</span>
                </div>
                <div className="tech-stack-tags">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">PyTorch</span>
                  <span className="tech-tag">Scikit-learn</span>
                  <span className="tech-tag">Pandas</span>
                  <span className="tech-tag">Model Fine-tuning</span>
                </div>
              </div>

              <div className="tech-stack-section">
                <div className="tech-stack-section-header">
                  <span className="tech-stack-dot" style={{background: '#8b5cf6'}}></span>
                  <span className="tech-stack-section-name">LLM & GenAI</span>
                </div>
                <div className="tech-stack-tags">
                  <span className="tech-tag">LangChain</span>
                  <span className="tech-tag">LangGraph</span>
                  <span className="tech-tag">RAG</span>
                  <span className="tech-tag">Hugging Face</span>
                  <span className="tech-tag">Prompt Engineering</span>
                  <span className="tech-tag">Vector DBs</span>
                </div>
              </div>

              <div className="tech-stack-section">
                <div className="tech-stack-section-header">
                  <span className="tech-stack-dot" style={{background: '#0ea5e9'}}></span>
                  <span className="tech-stack-section-name">Databases</span>
                </div>
                <div className="tech-stack-tags">
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">Vector DBs</span>
                  <span className="tech-tag">Supabase</span>
                </div>
              </div>

              <div className="tech-stack-section">
                <div className="tech-stack-section-header">
                  <span className="tech-stack-dot" style={{background: '#22c55e'}}></span>
                  <span className="tech-stack-section-name">AI Full Stack</span>
                </div>
                <div className="tech-stack-tags">
                  <span className="tech-tag">FastAPI</span>
                  <span className="tech-tag">REST APIs</span>
                  <span className="tech-tag">API Integration</span>
                  <span className="tech-tag">Streamlit</span>
                  <span className="tech-tag">End-to-End AI Web Apps</span>
                  <span className="tech-tag">Vibe Coding</span>
                  <span className="tech-tag">Full-stack AI Deployment</span>
                </div>
              </div>

              <div className="tech-stack-section">
                <div className="tech-stack-section-header">
                  <span className="tech-stack-dot" style={{background: '#f97316'}}></span>
                  <span className="tech-stack-section-name">Tools & DevOps</span>
                </div>
                <div className="tech-stack-tags">
                  <span className="tech-tag">Docker</span>
                  <span className="tech-tag">Git</span>
                  <span className="tech-tag">GitHub</span>
                  <span className="tech-tag">Vercel</span>
                  <span className="tech-tag">Postman</span>
                </div>
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
            <button
              className={`filter-btn ${activeProjectFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${activeProjectFilter === "ai-agents" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("ai-agents")}
            >
              AI Agents
            </button>
            <button
              className={`filter-btn ${activeProjectFilter === "llm-apps" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("llm-apps")}
            >
              LLM Applications
            </button>
            <button
              className={`filter-btn ${activeProjectFilter === "full-stack-ai" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("full-stack-ai")}
            >
              Full-Stack AI
            </button>
            <button
              className={`filter-btn ${activeProjectFilter === "cv" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("cv")}
            >
              Computer Vision
            </button>
          </div>

          <div className="projects-grid" id="projectsGrid">
            {/* MediQuery – Featured Project */}
            <article className={`project-card reveal-up featured-project ${activeProjectFilter !== "all" && !["full-stack-ai", "llm-apps"].includes(activeProjectFilter) ? "hidden" : ""}`}>
              <div className="project-featured-badge">⭐ Featured</div>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/medquiery.jpg" alt="MediQuery – AI Medical Document Assistant" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="Live Demo"><i className="fas fa-external-link-alt"></i></a>
                  <a href="#" className="proj-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="proj-tag">Python</span>
                  <span className="proj-tag">FastAPI</span>
                  <span className="proj-tag">LangChain</span>
                  <span className="proj-tag">ChromaDB</span>
                  <span className="proj-tag">PostgreSQL</span>
                  <span className="proj-tag">Next.js 14</span>
                  <span className="proj-tag">TypeScript</span>
                  <span className="proj-tag">Tailwind CSS</span>
                </div>
                <h3 className="project-title">MediQuery – AI Medical Document Assistant</h3>
                <p className="project-desc">AI clinical assistant that lets patients query their medical records in plain English using a full RAG pipeline — with semantic retrieval, multi-turn memory, and cited answers.</p>

              </div>
            </article>

            {/* ReviewAI – Featured Project */}
            <article className={`project-card reveal-up featured-project ${activeProjectFilter !== "all" && !["full-stack-ai", "llm-apps"].includes(activeProjectFilter) ? "hidden" : ""}`}>
              <div className="project-featured-badge">⭐ Featured</div>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/ReviewAI – Next-Gen Sentiment Intelligence Suite.jfif" alt="ReviewAI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

              </div>
            </article>

            {/* LangChain Multi-Agent Research System */}
            <article className={`project-card reveal-up ${activeProjectFilter !== "all" && activeProjectFilter !== "ai-agents" ? "hidden" : ""}`}>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/LangChain Multi-Agent Research System.png" alt="LangChain Multi-Agent Research System" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

              </div>
            </article>

            {/* AI Chatbot with LangGraph & FastAPI */}
            <article className={`project-card reveal-up ${activeProjectFilter !== "all" && activeProjectFilter !== "ai-agents" ? "hidden" : ""}`}>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/AI Chatbot with LangGraph & FastAPI.png" alt="AI Chatbot with LangGraph & FastAPI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

              </div>
            </article>

            {/* AI Communication Coach */}
            <article className={`project-card reveal-up ${activeProjectFilter !== "all" && !["llm-apps", "cv"].includes(activeProjectFilter) ? "hidden" : ""}`}>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/AI Communication Coach.png" alt="AI Communication Coach" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

              </div>
            </article>

            {/* Elder Care AI Companion System */}
            <article className={`project-card reveal-up ${activeProjectFilter !== "all" && activeProjectFilter !== "cv" ? "hidden" : ""}`}>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/Elder Care AI Companion System.png" alt="Elder Care AI Companion System" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

              </div>
            </article>

            {/* MediBot AI */}
            <article className={`project-card reveal-up ${activeProjectFilter !== "all" && activeProjectFilter !== "llm-apps" ? "hidden" : ""}`}>
              <div className="project-image">
                <div className="project-img-overlay"></div>
                <img src="/MediBot AI.png" alt="MediBot AI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                    <div className="timeline-date">Sep 2023 – Jun 2027</div>
                    <h4 className="timeline-title">Bachelor of Science in Computer Science (BSCS)</h4>
                    <span className="timeline-org">University of Agriculture, Faisalabad (UAF)</span>
                    <p className="timeline-desc">Pursuing a degree in Computer Science with a focus on AI and Machine Learning.</p>
                    <div className="timeline-tags">
                      <span>CGPA: 3.3/4.0</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">Mar 2021 – May 2023</div>
                    <h4 className="timeline-title">Intermediate – FSC</h4>
                    <span className="timeline-org">KIPS College, Faisalabad</span>
                    <p className="timeline-desc">Completed intermediate education with a focus on pre-engineering.</p>
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
                    <div className="timeline-date">Jun 2025 – Aug 2025</div>
                    <h4 className="timeline-title">AI/ML Engineering Intern</h4>
                    <span className="timeline-org">Career Institute, Faisalabad</span>
                    <p className="timeline-desc">
                      Completed a structured AI/ML program building and evaluating classification and regression models using Python, scikit-learn, pandas, and NumPy across end-to-end ML pipelines.<br /><br />
                      Applied industry best practices in data preprocessing, feature engineering, model evaluation, version control, and results reporting — preparing production-ready AI/ML workflows.<br /><br />
                      Developed prototypes to simulate model training, testing, and deployment scenarios, gaining practical experience with pickle serialization and real-time inference.
                    </p>
                    <div className="timeline-tags">
                      <span>Python</span>
                      <span>scikit-learn</span>
                      <span>pandas</span>
                      <span>NumPy</span>
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
                <div className="cert-icon"><i className="fas fa-graduation-cap"></i></div>
                <div className="cert-name">Machine Learning Specialization</div>
                <div className="cert-issuer">Andrew Ng, DeepLearning.AI & Stanford University (Coursera)</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.1">
                <div className="cert-icon"><i className="fab fa-ibm"></i></div>
                <div className="cert-name">Python for Data Science, AI & Development</div>
                <div className="cert-issuer">IBM (Coursera) | ID: VFEX71365C0Q</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.2">
                <div className="cert-icon"><i className="fab fa-google"></i></div>
                <div className="cert-name">Introduction to Artificial Intelligence</div>
                <div className="cert-issuer">Google (Coursera) | ID: H6RGE3R9RGKG</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.3">
                <div className="cert-icon"><i className="fas fa-users"></i></div>
                <div className="cert-name">Collaborate Effectively for Professional Success</div>
                <div className="cert-issuer">IBM (Coursera) | ID: MAYHO1EBOVJC</div>
              </div>
              <div className="cert-card reveal-up" data-delay="0.4">
                <div className="cert-icon"><i className="fas fa-brain"></i></div>
                <div className="cert-name">Artificial Intelligence</div>
                <div className="cert-issuer">Career Institute (2025)</div>
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
                <a href="mailto:mianzaid049@gmail.com" className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-val">mianzaid049@gmail.com</span>
                  </div>
                  <div className="contact-card-arrow"><i className="fas fa-arrow-right"></i></div>
                </a>

                <a href="#" className="contact-card">
                  <div className="contact-card-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">Location</span>
                    <span className="contact-card-val">Faisalabad, Pakistan</span>
                  </div>
                  <div className="contact-card-arrow"><i className="fas fa-arrow-right"></i></div>
                </a>
              </div>

              <div className="contact-socials">
                <a href="https://github.com/zaid-mian" target="_blank" className="social-btn"><i className="fab fa-github"></i> GitHub</a>
                <a href="https://www.linkedin.com/in/muhammad-zaid-tahir-3a6160362/" target="_blank" className="social-btn"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
                <a href="https://wa.me/923295366074?text=Hi%20Muhammad%20Zaid,%20I'm%20interested%20in%20your%20AI/ML%20services!" target="_blank" className="social-btn"><i className="fab fa-whatsapp"></i> WhatsApp</a>
              </div>
            </div>

            <div className="contact-form-wrap reveal-right">
              <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required={true} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required={true} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Project Discussion" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Tell me about your project..." required={true}></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  <div className="btn-loader" style={{ display: isLoading ? "block" : "none" }}></div>
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
                <div className="form-success" style={{ display: showSuccess ? "block" : "none" }}>
                  <i className="fas fa-check-circle"></i> Message sent successfully! I'll get back to you soon.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "40px 24px",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        textAlign: "center"
      }}>
        <div className="container" style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem"
          }}>
            Copyright © 2025 Muhammad Zaid. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot UI */}
      <div>
        {/* Chatbot Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
            zIndex: "9999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            color: "white",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <i className={isChatOpen ? "fas fa-times" : "fas fa-comments"}></i>
        </button>

        {/* Chatbot Window */}
        {isChatOpen && (
          <div style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "400px",
            maxWidth: "calc(100vw - 60px)",
            height: "600px",
            maxHeight: "calc(100vh - 150px)",
            background: "var(--bg-primary)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: "9998",
            border: "1px solid var(--border-color)"
          }}>
            {/* Chatbot Header */}
            <div style={{
              padding: "20px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
              }}>
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>Zaid's AI Assistant</div>
                <div style={{ fontSize: "14px", opacity: "0.9" }}>Always here to help!</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{
              padding: "12px 15px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px"
            }}>
              {[
                "Skills",
                "Projects",
                "Education",
                "AI/ML Experience",
                "Full Stack Work",
                "Resume"
              ].map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    fontSize: "13px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bg-secondary)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%"
                  }}
                >
                  <div style={{
                    padding: "12px 18px",
                    borderRadius: msg.sender === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                    background: msg.sender === "user" ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" : "var(--bg-secondary)",
                    color: msg.sender === "user" ? "white" : "var(--text-primary)",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line"
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Hire Me Button */}
            <div style={{ padding: "10px 20px", borderTop: "1px solid var(--border-color)" }}>
              <button
                onClick={handleHireMe}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px"
                }}
              >
                <i className="fas fa-handshake" style={{ marginRight: "8px" }}></i> Hire Me
              </button>
            </div>

            {/* Input Area */}
            <div style={{
              padding: "15px",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              gap: "10px"
            }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  borderRadius: "30px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

