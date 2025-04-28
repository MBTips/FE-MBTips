import { trackEvent } from "@/libs/analytics";

const trackClickEvent = (page: string, element: string) => {
  trackEvent("Click", {
    page: page,
    element: element
  });
};

export default trackClickEvent;
