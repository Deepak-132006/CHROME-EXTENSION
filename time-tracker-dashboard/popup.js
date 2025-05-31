// Helper to format seconds to H M S
function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}h ${m}m ${s}s`;
}

// Update all the displayed times from storage
function updateTime() {
  chrome.storage.local.get(
    ['trackedSeconds', 'productiveSeconds', 'neutralSeconds', 'distractingSeconds'], 
    (data) => {
      document.getElementById('time').textContent = formatTime(data.trackedSeconds || 0);
      document.getElementById('productive-time').textContent = formatTime(data.productiveSeconds || 0);
      document.getElementById('neutral-time').textContent = formatTime(data.neutralSeconds || 0);
      document.getElementById('distracting-time').textContent = formatTime(data.distractingSeconds || 0);
    }
  );
}

// Reset all counters in storage
function resetTime() {
  chrome.storage.local.set({
    trackedSeconds: 0,
    productiveSeconds: 0,
    neutralSeconds: 0,
    distractingSeconds: 0
  }, () => {
    updateTime();
  });
}

// Update time every second
updateTime();
setInterval(updateTime, 1000);

// Add click listener to Reset button
document.getElementById('reset-btn').addEventListener('click', resetTime);
