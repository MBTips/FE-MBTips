import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

export const initGA = () => {
  if (GA_MEASUREMENT_ID && process.env.NODE_ENV === "production") {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string) => {
  if (GA_MEASUREMENT_ID && process.env.NODE_ENV === "production") {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string
) => {
  if (GA_MEASUREMENT_ID && process.env.NODE_ENV === "production") {
    ReactGA.event({
      category,
      action,
      label
    });
  }
};
