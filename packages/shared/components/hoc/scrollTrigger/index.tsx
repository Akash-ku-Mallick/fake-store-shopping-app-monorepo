import React, { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  handleScroll: () => void;
  triggerOn?: 'top' | 'bottom'; // default is 'bottom'
}

const ScrollTrigger = ({ children, handleScroll, triggerOn = 'bottom' }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCustomScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 40; // px
    const isAtTop = el.scrollTop <= threshold;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

    if ((triggerOn === 'top' && isAtTop) || (triggerOn === 'bottom' && isAtBottom)) {
      handleScroll();
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleCustomScroll}
      className="h-[70vh] overflow-y-auto p-6 scroll-smooth bg-white dark:bg-gray-900"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f8fafc',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollTrigger;
