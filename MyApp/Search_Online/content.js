document.addEventListener("mouseup", (e) => {
    const selected = window.getSelection().toString().trim();
    if (selected) {
        chrome.runtime.sendMessage({
            type: "SELECTION_POSITION",
            x: e.screenX,
            y: e.screenY,
            text: selected,
        });
    }
});
