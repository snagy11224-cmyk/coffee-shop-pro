import { useEffect, useState } from "react";

export default function useSectionHighlight(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.5 };
    const observers = [];

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, options);

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [sectionIds]);

  return active;
}
