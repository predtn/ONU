const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

/**
 * Gets the visitor source from URL parameters, document.referrer, or sessionStorage
 */
export const getVisitorSource = (): string => {
  if (typeof window === 'undefined') return 'Web';

  // 1. Check if source already stored in current session
  const cachedSource = sessionStorage.getItem('visitor_source');
  if (cachedSource) {
    return cachedSource;
  }

  // 2. Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  let source = urlParams.get('source') || urlParams.get('utm_source') || urlParams.get('ref');

  // 3. Fallback to referrer if no parameter is found
  if (!source && document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      const host = referrerUrl.hostname.toLowerCase();
      
      if (host.includes('facebook.com') || host.includes('fb.me')) {
        source = 'Facebook';
      } else if (host.includes('t.co') || host.includes('twitter.com')) {
        source = 'Twitter/X';
      } else if (host.includes('tiktok.com')) {
        source = 'TikTok';
      } else if (host.includes('youtube.com') || host.includes('youtu.be')) {
        source = 'YouTube';
      } else if (host.includes('google.com')) {
        source = 'Google Search';
      } else {
        source = referrerUrl.hostname; // E.g., generic website
      }
    } catch {
      source = 'Referrer';
    }
  }

  // 4. Default to Direct
  if (!source) {
    source = 'Web';
  }

  // Save to sessionStorage to keep source consistent within session
  sessionStorage.setItem('visitor_source', source);
  return source;
};

interface TrackingPayload {
  source: string;
  access?: boolean;
  clickInteract?: boolean;
  clickOrder?: boolean;
  orderReal?: boolean;
}

/**
 * Sends a tracking event to the Google Apps Script Web App
 */
export const sendTrackingEvent = async (event: Omit<TrackingPayload, 'source'>) => {
  if (!googleScriptUrl) {
    console.warn('Google Script URL is not configured. Tracking event ignored:', event);
    return;
  }

  const payload: TrackingPayload = {
    source: getVisitorSource(),
    ...event,
  };

  try {
    // We use no-cors since Google Apps Script redirects might cause CORS preflight to fail,
    // but the POST request still successfully reaches the script.
    await fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to send tracking event:', error);
  }
};

/**
 * Track a page view/access event
 */
export const trackPageView = () => sendTrackingEvent({ access: true });

/**
 * Track an interaction event (e.g. click on accordions, features, 3D card)
 */
export const trackInteraction = () => sendTrackingEvent({ clickInteract: true });

/**
 * Track a click on the order button
 */
export const trackOrderClick = () => sendTrackingEvent({ clickOrder: true });

/**
 * Track a successful checkout/order submission
 */
export const trackActualOrder = () => sendTrackingEvent({ orderReal: true });
