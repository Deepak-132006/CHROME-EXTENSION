document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["usage"], (result) => {
    const usage = result.usage || {};
    const usageList = document.getElementById("usageList");

    const sorted = Object.entries(usage).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([domain, time]) => {
      const li = document.createElement("li");
      li.textContent = `${domain}: ${Math.round(time / 1000)}s`;
      usageList.appendChild(li);
    });
  });
});
document.body.addEventListener("dblclick", () => {
  chrome.storage.local.clear(() => alert("Cleared!"));
});

