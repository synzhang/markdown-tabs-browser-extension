// Load current setting
chrome.storage.sync.get({ saveType: "copy" }, ({ saveType }) => {
  document.querySelector(`input[value="${saveType}"]`).checked = true;
});

// Save new setting
document.querySelectorAll('input[name="action"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    chrome.storage.sync.set({ saveType: e.target.value });
  });
});
