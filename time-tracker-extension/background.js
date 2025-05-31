let currentTabId = null;
let currentStartTime = null;

function logTime(tabId, timeSpent) {
  chrome.tabs.get(tabId, (tab) => {
    if (!tab || !tab.url.startsWith("http")) return;
    const domain = new URL(tab.url).hostname;
    const data = {
      domain,
      timeSpent,
      timestamp: new Date().toISOString()
    };

    // Store in Chrome local storage
    chrome.storage.local.get(["usage"], (result) => {
      const usage = result.usage || {};
      if (!usage[domain]) usage[domain] = 0;
      usage[domain] += timeSpent;
      chrome.storage.local.set({ usage });
    });
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  const now = Date.now();
  if (currentTabId !== null && currentStartTime !== null) {
    const timeSpent = now - currentStartTime;
    logTime(currentTabId, timeSpent);
  }
  currentTabId = activeInfo.tabId;
  currentStartTime = now;
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  const now = Date.now();
  if (currentTabId !== null && currentStartTime !== null) {
    const timeSpent = now - currentStartTime;
    logTime(currentTabId, timeSpent);
  }

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    currentTabId = null;
    currentStartTime = null;
  } else {
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs.length > 0) {
        currentTabId = tabs[0].id;
        currentStartTime = now;
      }
    });
  }
});

chrome.runtime.onStartup.addListener(() => {
  currentTabId = null;
  currentStartTime = null;
});
fetch("http://localhost:5000/api/track", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    domain,
    duration,
    userId: "user-1234" // Replace with real UUID later
  })
});
