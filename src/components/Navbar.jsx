import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalDetails } from '../data';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cvUrl = personalDetails.cv_url || '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="logo">
            <img src="/logo.png" alt="HD" style={{ height: '65px', objectFit: 'contain' }} />
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            {cvUrl && (
                <a 
                  href={cvUrl} 
                  target="_blank" 
                  download 
                  className="btn" 
                  style={{ 
                    padding: '8px 20px', 
                    fontSize: '0.9rem',
                    background: 'linear-gradient(90deg, #5709B0 0%, #FCE60D 100%)', // Purple to Yellow
                    color: 'white',
                    border: 'none',
                    fontWeight: '600',
                    boxShadow: '0 0 15px rgba(147, 51, 234, 0.4)'
                  }}
                >
                Download My CV
                </a>
            )}
          </div>

          <button className="mobile-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="mobile-link"
            onClick={toggleMenu}
          >
            {link.name}
          </a>
        ))}
         <a 
            href={cvUrl || "#"} 
            target="_blank"
            download={!!cvUrl}
            className="btn" 
            onClick={toggleMenu}
            style={{ 
              marginTop: '1rem',
              padding: '10px 30px', 
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #5709B0 0%, #FCE60D 100%)',
              color: 'white',
              border: 'none',
              fontWeight: '600'
            }}
         >
            Download My CV
         </a>
      </div>
    </>
  );
};

export default Navbar;
