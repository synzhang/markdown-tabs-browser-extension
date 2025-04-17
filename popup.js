document.getElementById("saveBtn").addEventListener("click", async () => {
  const currentWindow = await chrome.windows.getCurrent();
  const tabs = await chrome.tabs.query({ windowId: currentWindow.id });

  // 过滤掉空 tab
  const filteredTabs = tabs.filter(
    (tab) =>
      tab.url &&
      !tab.url.startsWith("chrome://") &&
      !tab.url.startsWith("about:blank") &&
      tab.url.trim() !== ""
  );

  const markdown = filteredTabs.map((tab) => `- [${tab.title}](${tab.url})`).join("\n");

  const { saveType } = await chrome.storage.sync.get({ saveType: "copy" });

  if (saveType === "download") {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url,
      filename: `tabs-${Date.now()}.md`,
      saveAs: true,
    });
  } else {
    await navigator.clipboard.writeText(markdown);
    alert("Current window tabs copied as Markdown!");
  }
});
