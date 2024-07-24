export function waitElement(id) {
    return new Promise((resolve) => {
      const checkElements = () => {
        const container = document.querySelector(id);
        if (container) {
          resolve();
        } else {
          setTimeout(checkElements, 100); // Check again after 100ms
        }
      };
      checkElements();
    });
  }