import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

const isProduction = import.meta.env.MODE === "production";

const initGA = () => {
  console.log("isProduction", isProduction);
  console.log("ID", GA_MEASUREMENT_ID);
  if (isProduction && GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

const trackPageView = (path: string) => {
  if (isProduction && GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

const trackEvent = (category: string, action: string, label?: string) => {
  if (isProduction && GA_MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label
    });
  }
};

export { initGA, trackPageView, trackEvent };
