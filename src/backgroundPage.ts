import { browser } from "webextension-polyfill-ts";
import { Message } from "@src/def/messages";
import { LawsSiteUrlPattern } from "@src/def/eGov";

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
    // Log statement if request.popupMounted is true
    // NOTE: this request is sent in `popup/component.tsx`
    if (request.popupMounted) {
        console.log("backgroundPage notified that Popup.tsx has mounted.");
    }
});

browser.contextMenus.create({
    id: "highlight-parentheses",
    title: "条文の括弧を強調表示",
    contexts: ["page"],
    documentUrlPatterns: [LawsSiteUrlPattern],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    const tabId = tab?.id;
    if (!tabId) return;

    switch (info.menuItemId) {
        case "highlight-parentheses":
            browser.tabs.sendMessage(tabId, {
                kind: "highlightParentheses",
                clickedElementId: info.targetElementId,
            } as Message);
            break;
    }
});
