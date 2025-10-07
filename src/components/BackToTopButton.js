import React, { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up a listener for scroll events
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && 
        <button onClick={scrollToTop} className="btn btn-dark btn-lg">
          ↑
        </button>
      }
    </div>
  );
}