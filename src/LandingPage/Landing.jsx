import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Book,
  User,
  Shield,
  Smartphone,
  Code,
  Database,
  Globe,
  ChevronRight,
  GitHub,
  Linkedin,
  Mail,
} from "react-feather";

import styles from "./landing.module.css";
import { Link } from "react-router-dom";

const EtechLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techStack = [
    { name: "React.js", category: "Frontend" },
    { name: "Redux Toolkit", category: "State Management" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "JWT", category: "Security" },
    { name: "bcrypt", category: "Security" },
    { name: "REST API", category: "Integration" },
  ];

  const features = [
    {
      icon: <Globe className={styles.featureIcon} />,
      title: "Dynamic Routing",
      description:
        "Smooth navigation between pages without reloading, enhancing speed and user experience.",
    },
    {
      icon: <Database className={styles.featureIcon} />,
      title: "State Management",
      description:
        "Efficient data flow across components using Redux Toolkit, ensuring consistency and reliability.",
    },
    {
      icon: <Code className={styles.featureIcon} />,
      title: "API Integration",
      description:
        "Real-time data through RESTful APIs, ensuring users get up-to-date information dynamically.",
    },
    {
      icon: <Smartphone className={styles.featureIcon} />,
      title: "Fully Responsive",
      description:
        "Seamless adaptation across all devices - desktops, tablets, and mobile phones.",
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: "Secure Authentication",
      description:
        "JWT and bcrypt implementation for encrypted password management and secure user sessions.",
    },
    {
      icon: <Book className={styles.featureIcon} />,
      title: "Course Management",
      description:
        "Comprehensive system for course discovery, enrollment, and user engagement tracking.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.navItems}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Book className={styles.logoIconSvg} />
              </div>
              <span className={styles.logoText}>E-Tech</span>
            </div>

            <div className={styles.navLinks}>
              <a href="#features" className={styles.navLink}>
                Features
              </a>
              <a href="#tech" className={styles.navLink}>
                Tech Stack
              </a>
              <a href="#about" className={styles.navLink}>
                About
              </a>
              <a href="#owner" className={styles.navLink}>
                Owner
              </a>
              <Link to="login" className={styles.ctaButton}>
                View Demo
              </Link>
            </div>

            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={styles.menuIcon} />
              ) : (
                <Menu className={styles.menuIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <a href="#features" className={styles.mobileNavLink}>
                Features
              </a>
              <a href="#tech" className={styles.mobileNavLink}>
                Tech Stack
              </a>
              <a href="#about" className={styles.mobileNavLink}>
                About
              </a>
              <a href="#owner" className={styles.mobileNavLink}>
                Owner
              </a>
              <button className={styles.mobileCta}>View Demo</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div
            className={`${styles.heroText} ${isVisible ? styles.visible : ""}`}
          >
            <div className={styles.badge}>
              <span className={styles.badgeText}>
                Internship Project at AlterSquare
              </span>
              <span className={styles.badgeLabel}>Jan 2025 - May 2025</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleAccent}>E-Tech</span>
              <br />
              E-Learning Platform
            </h1>

            <p className={styles.heroDescription}>
              A scalable, full-stack e-learning platform that simplifies course
              discovery, enrollment, and user engagement with cutting-edge
              technology.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/login" className={styles.primaryButton}>
                Explore Platform
                <ChevronRight className={styles.buttonIcon} />
              </Link>
              <a
                href="https://github.com/naresh043/react-project.git"
                className={styles.secondaryButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Platform Features</h2>
            <p className={styles.sectionDescription}>
              Built with modern technologies to provide a seamless and
              interactive learning experience
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className={styles.techSection}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Technology Stack</h2>
            <p className={styles.sectionDescription}>
              Powered by modern, industry-standard technologies
            </p>
          </div>

          <div className={styles.techGrid}>
            {techStack.map((tech, index) => (
              <div key={index} className={styles.techCard}>
                <h3 className={styles.techName}>{tech.name}</h3>
                <span className={styles.techCategory}>{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>About the Project</h2>
          </div>

          <div className={styles.aboutCard}>
            <div className={styles.aboutText}>
              <p className={styles.aboutParagraph}>
                E-Tech is a comprehensive full-stack e-learning platform
                developed during my internship at AlterSquare. The project
                demonstrates advanced web development skills with a focus on
                scalability, security, and user experience.
              </p>

              <div className={styles.aboutGrid}>
                <div className={styles.aboutColumn}>
                  <h3 className={styles.aboutSubtitle}>
                    Frontend Architecture
                  </h3>
                  <ul className={styles.aboutList}>
                    <li>• Responsive UI with React.js</li>
                    <li>• Redux Toolkit for state management</li>
                    <li>• Dynamic routing with React Router</li>
                    <li>• Real-time API integration</li>
                  </ul>
                </div>

                <div className={styles.aboutColumn}>
                  <h3 className={styles.aboutSubtitle}>
                    Backend Infrastructure
                  </h3>
                  <ul className={styles.aboutList}>
                    <li>• Node.js & Express.js with MVC architecture</li>
                    <li>• MongoDB for data persistence</li>
                    <li>• JWT authentication & bcrypt security</li>
                    <li>• RESTful API design</li>
                  </ul>
                </div>
              </div>

              <p className={styles.aboutParagraph}>
                The platform follows clean code practices, Git-based version
                control, and agile methodologies, ensuring maintainable and
                scalable code architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section id="owner" className={styles.ownerSection}>
        <div className={styles.ownerContent}>
          {/* <h2 className={styles.sectionTitle}>Project Owner</h2> */}
          <h2 className={styles.sectionTitle}>Meet the Developer</h2>

          <div className={styles.ownerCard}>
            <div className={styles.ownerAvatar}>
              <User className={styles.ownerAvatarIcon} />
            </div>
            <h3 className={styles.ownerName}>Naresh Sanjeev</h3>
            <h3 className={styles.ownerTitle}>MERN-Stack Developer</h3>
            <p className={styles.ownerDescription}>
              Passionate about building scalable web applications using modern
              technologies. Skilled in both frontend and backend development,
              with a strong focus on responsive design, performance, and writing
              clean, maintainable code.
            </p>
            <div className={styles.ownerSocial}>
              <a
                href="https://github.com/naresh043?tab=repositories"
                className={styles.socialLink}
              >
                <GitHub className={styles.socialIcon} />
              </a>
              <a
                href="https://www.linkedin.com/in/nareshsanjeev/ "
                className={styles.socialLink}
              >
                <Linkedin className={styles.socialIcon} />
              </a>
              <a
                href="mailto:nareshsanjeev07@gmail.com?subject=Feedback&body=Hi Naresh,"
                className={styles.socialLink}
              >
                <Mail className={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>
              <Book className={styles.footerLogoSvg} />
            </div>
            <span className={styles.footerLogoText}>E-Tech</span>
          </div>
          <p className={styles.footerText}>
            © 2025 E-Tech Platform. Built with ❤️ using React.js and modern web
            technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EtechLanding;
