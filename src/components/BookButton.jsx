import React from 'react';

// Smooth-scrolls to the inline #register form. Replaces the old unlock-overlay flow.
export default function BookButton({ children, className = 'btn-primary', ...rest }) {
  const onClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the first input shortly after the scroll settles.
      setTimeout(() => {
        const first = el.querySelector('input, select');
        if (first) first.focus({ preventScroll: true });
      }, 600);
    } else {
      window.location.hash = '#register';
    }
  };

  return (
    <a href="#register" onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}

