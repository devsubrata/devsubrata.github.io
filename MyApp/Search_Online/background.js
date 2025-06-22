/// <reference types="chrome" />

importScripts("links.js");
const baseUrls = lookUpLinks();

let lastSelectionInfo = null;

// Save selection coordinates and text
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "SELECTION_POSITION") {
        lastSelectionInfo = msg;
    }
});

chrome.runtime.onInstalled.addListener(() => {
    // Parent menu
    chrome.contextMenus.create({
        id: "search_online",
        title: `Search "%s" Online`,
        contexts: ["selection"],
    });

    for (const [name, url] of Object.entries(baseUrls)) {
        chrome.contextMenus.create({
            id: name.split(" ")[0],
            parentId: "search_online",
            title: name,
            contexts: ["selection"],
        });
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = info.selectionText;
    if (!selectedText) return;

    const baseUrl = baseUrls[info.menuItemId];
    if (!baseUrl) return;

    const word_url = baseUrl.replace("{search_term}", encodeURIComponent(selectedText));

    const popupWidth = 800;
    const popupHeight = 1000;

    // Fallback if no selection position is known
    const x = lastSelectionInfo?.x ?? 100;
    const y = lastSelectionInfo?.y ?? 100;

    chrome.system.display.getInfo((displays) => {
        // Find display where the user clicked
        const currentDisplay = displays.find((d) => {
            const bounds = d.bounds;
            return x >= bounds.left && x <= bounds.left + bounds.width && y >= bounds.top && y <= bounds.top + bounds.height;
        });

        console.log(currentDisplay);

        const workArea = currentDisplay?.workArea || { left: 0, top: 0, width: 1920, height: 1080 };

        // Clamp popup position within display bounds
        const popupLeft = Math.min(Math.max(x, workArea.left), workArea.left + workArea.width - popupWidth);
        const popupTop = Math.min(Math.max(y, workArea.top), workArea.top + workArea.height - popupHeight);

        chrome.windows.create({
            url: word_url,
            type: "popup",
            width: popupWidth,
            height: popupHeight,
            left: popupLeft,
            top: popupTop,
            focused: true,
        });
    });
});
