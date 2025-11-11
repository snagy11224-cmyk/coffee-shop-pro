import { useEffect, useState } from "react";

export default function useSectionHighlight(sectionIds = [], options = {}) {
  const [active, setActive] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    if (!sectionIds.length) {
      setActive(null);
      return;
    }

    const obsOptions = {
      root: null,
      rootMargin: options.rootMargin ?? "0px 0px -40% 0px",
      threshold: options.threshold ?? 0.4,
    };

    const observers = [];
    const onIntersect = (id) => (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) setActive(id);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(onIntersect(id), obsOptions);
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [JSON.stringify(sectionIds), options.rootMargin, options.threshold]);

  return active;
}
