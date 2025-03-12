import { useEffect, useState } from "react";

const useLayoutSize = () => {
  const [size, setSize] = useState<"sm" | "md" | "lg">("sm");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) setSize("sm");
      else if (window.innerWidth >= 375 && window.innerWidth < 500)
        setSize("md");
      else setSize("lg");
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useLayoutSize;
