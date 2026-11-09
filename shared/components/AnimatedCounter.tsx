import React, { useEffect, useState, useRef } from 'react';

export interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = '',
  duration = 1600,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Parse the value string: e.g. "12.500+", "99.4%", "15 Năm", "$4.8B+", "620 km", "4.9/5 ★"
    const match = value.match(/([^\d.]*)([\d,.]+)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numRaw = match[2];
    const suffix = match[3] || '';

    // Check if it's formatted like "12.500" (Vietnamese thousands with dot)
    // or standard float like "99.4" or "4.8"
    const isThousandsWithDot = /^\d{1,3}\.\d{3}/.test(numRaw);
    let targetNum: number;
    let isFloat = false;
    let decimalPlaces = 0;

    if (isThousandsWithDot) {
      targetNum = parseFloat(numRaw.replace(/\./g, ''));
    } else {
      targetNum = parseFloat(numRaw.replace(/,/g, ''));
      if (numRaw.includes('.')) {
        isFloat = true;
        decimalPlaces = numRaw.split('.')[1].length;
      }
    }

    if (isNaN(targetNum) || targetNum === 0) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease-out cubic curve
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = targetNum * easeOut;

            let formatted: string;
            if (isThousandsWithDot) {
              formatted = new Intl.NumberFormat('vi-VN').format(Math.round(currentNum));
            } else if (isFloat) {
              formatted = currentNum.toFixed(decimalPlaces);
            } else {
              formatted = Math.round(currentNum).toString();
            }

            setDisplayValue(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-all ${className}`}>
      {displayValue}
    </span>
  );
};

