import React, { useEffect, useRef, useState, ReactNode } from 'react';

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'scale' | 'none';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const getHiddenTransform = () => {
    switch (direction) {
      case 'left':
        return '-translate-x-12 opacity-0';
      case 'right':
        return 'translate-x-12 opacity-0';
      case 'up':
        return 'translate-y-12 opacity-0';
      case 'scale':
        return 'scale-90 opacity-0';
      case 'none':
        return 'opacity-0';
      default:
        return 'translate-y-10 opacity-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '750ms',
      }}
      className={`transform transition-all ease-out will-change-transform ${
        isVisible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : getHiddenTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
};

