import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

const isProduction = import.meta.env.MODE === "production";

export const initGA = () => {
  console.log("isProduction", isProduction);
  console.log("ID", GA_MEASUREMENT_ID);
  if (isProduction && GA_MEASUREMENT_ID) {
    console.log("initGA");
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (url: string, params?: Record<string, string>) => {
  if (isProduction && GA_MEASUREMENT_ID) {
    console.log("trackPageView");
    ReactGA.gtag("event", "page_view", {
      page_path: url,
      ...params
    });
  }
};

export const trackEvent = (name: string, params?: Record<string, string>) => {
  if (isProduction && GA_MEASUREMENT_ID) {
    console.log("trackEvent");
    ReactGA.event(name, params);
  }
};
