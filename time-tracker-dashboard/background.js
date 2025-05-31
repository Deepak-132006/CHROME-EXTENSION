// Example site categories
const productiveSites = [
  'github.com',
  'stackoverflow.com',
  'docs.google.com',
  'mail.google.com',
  'office.com',
  'linkedin.com'
];

const distractingSites = [
  'youtube.com',
  'facebook.com',
  'twitter.com',
  'reddit.com',
  'instagram.com',
  'tiktok.com'
];

let currentCategory = 'neutral';

function updateActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;
    try {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname.replace('www.', '');

      if (productiveSites.some(site => hostname.includes(site))) {
        currentCategory = 'productive';
      } else if (distractingSites.some(site => hostname.includes(site))) {
        currentCategory = 'distracting';
      } else {
        currentCategory = 'neutral';
      }
    } catch (e) {
      currentCategory = 'neutral'; // In case URL parsing fails
    }
  });
}

// Listen for tab changes and update current category
chrome.tabs.onActivated.addListener(updateActiveTab);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateActiveTab();
  }
});

// Increment timers every second
setInterval(() => {
  chrome.storage.local.get(
    ['trackedSeconds', 'productiveSeconds', 'neutralSeconds', 'distractingSeconds'], 
    (data) => {
      let trackedSeconds = data.trackedSeconds || 0;
      let productiveSeconds = data.productiveSeconds || 0;
      let neutralSeconds = data.neutralSeconds || 0;
      let distractingSeconds = data.distractingSeconds || 0;

      trackedSeconds++;

      if (currentCategory === 'productive') productiveSeconds++;
      else if (currentCategory === 'neutral') neutralSeconds++;
      else if (currentCategory === 'distracting') distractingSeconds++;

      chrome.storage.local.set({
        trackedSeconds,
        productiveSeconds,
        neutralSeconds,
        distractingSeconds
      });
    }
  );
}, 1000);
