// utils/analytics.js
import ReactGA from 'react-ga4';

export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

export const trackPageView = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.search,
  });
};
export const trackLoginEvent = () => {
  ReactGA.event({
    category: 'User',
    action: 'Login',
    label: 'User Login',
  });
};