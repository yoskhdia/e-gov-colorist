import { browser } from "webextension-polyfill-ts";
import { HighlightParentheses, Message } from "@src/def/messages";

let contextMenuOnClickedElement: Element;
document.addEventListener(
    "contextmenu",
    (event) => {
        contextMenuOnClickedElement = event.target as Element;
    },
    false,
);

function highlightParentheses(message: HighlightParentheses) {
    let clickedElement: Element;
    if (message.clickedElementId) {
        clickedElement = browser.menus.getTargetElement(
            message.clickedElementId,
        );
    } else {
        clickedElement = contextMenuOnClickedElement;
    }
    const articleBlock = clickedElement?.closest(".Article");
    if (articleBlock) {
        if (!articleBlock.classList.contains("__highlighted__")) {
            articleBlock.classList.add("__highlighted__");

            articleBlock.innerHTML = insertHighlightTag(articleBlock.innerHTML);
        }
    }
}

const colorPalette = [
    "lightpink",
    "lightblue",
    "lightcoral",
    "lightgoldenrodyellow",
    "lightsalmon",
    "lightskyblue",
];

function insertHighlightTag(innerHtml: string): string {
    let i = 0;
    function pickColor(): string {
        const color = colorPalette[i];
        if (i + 1 >= colorPalette.length) {
            i = 0;
        } else {
            i += 1;
        }
        return color;
    }

    return innerHtml
        .replace(/（/g, (s) => {
            return `<span class='__highlighted_text__' style='background-color: ${pickColor()}'>${s}`;
        })
        .replace(/）/g, (s) => {
            return `${s}</span>`;
        });
}

function handler(message: Message) {
    switch (message.kind) {
        case "highlightParentheses":
            highlightParentheses(message);
            break;
    }
}
browser.runtime.onMessage.addListener(handler);
