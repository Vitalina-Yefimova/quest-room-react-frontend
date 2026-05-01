import { useState, useRef, ReactNode } from "react";
import CursorHandIcon from "../../icons/CursorHandIcon";

interface CustomCursorWrapperProps {
  children: ReactNode;
}

const CustomCursorWrapper: React.FC<CustomCursorWrapperProps> = ({
  children,
}) => {
  const [isCursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative cursor-none"
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => setCursorVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {isCursorVisible && (
        <div
          className="absolute pointer-events-none transition-transform duration-75 z-50"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <CursorHandIcon />
        </div>
      )}
      {children}
    </div>
  );
};

export default CustomCursorWrapper;
