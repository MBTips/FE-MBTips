import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

const isProduction = import.meta.env.MODE === "production";

export const initGA = () => {
  if (isProduction && GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (url: string, page: string) => {
  if (isProduction && GA_MEASUREMENT_ID) {
    ReactGA.gtag("event", "page_view", {
      page_path: url,
      page: page
    });
  }
};

export const trackEvent = (name: string, params?: Record<string, string>) => {
  if (isProduction && GA_MEASUREMENT_ID) {
    ReactGA.event(name, params);
  }
};
