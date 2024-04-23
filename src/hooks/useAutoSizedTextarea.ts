import { useEffect, useRef } from "react";

// responsively adjust the height of textarea
const useAutoSizedTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const adjustHeight = () => {
        // prevent incorrectly adding another row when typing
        textarea.style.overflow = 'hidden';
        textarea.style.height = `${textarea.scrollHeight}px`; 
      };

      adjustHeight();
      textarea.addEventListener('input', adjustHeight);

      return () => {
        textarea.removeEventListener('input', adjustHeight);
      };
    }
  }, []);

  return textareaRef
};

export default useAutoSizedTextarea;
