browser.contextMenus.create({
    id: "copy-embed",
    title: "Copy Reddit embed link",
    contexts: ["link"],
    targetUrlPatterns: ["*://www.reddit.com/*"]
}, function (){});

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "copy-embed":
            const code = "copyToClipboard('"+info.linkUrl+"');";
            browser.tabs.executeScript({
                code: "typeof copyToClipboard === 'function';",
            }).then((results) => {
                if (!results || results[0] !== true) {
                    return browser.tabs.executeScript(tab.id, {
                        file: "clipboard_helper.js",
                    });
                }
            }).then(() => {
                return browser.tabs.executeScript(tab.id, {
                    code,
                });
            }).catch((error) => {
                console.error("Failed to copy text: " + error);
            });
            break;
    }
});