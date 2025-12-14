// Animation utilities for subtle visual effects

export const fadeIn = {
  animation: 'fadeIn 0.3s ease-in',
};

export const slideIn = {
  animation: 'slideIn 0.4s ease-out',
};

export const highlight = {
  animation: 'highlight 0.6s ease-in-out',
};

export const pulse = {
  animation: 'pulse 1s ease-in-out infinite',
};

// CSS keyframes (to be added to index.css)
export const animationStyles = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes highlight {
  0% {
    background-color: #90EE90;
  }
  50% {
    background-color: #FFD700;
  }
  100% {
    background-color: transparent;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
`;

