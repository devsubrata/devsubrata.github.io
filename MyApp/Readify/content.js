function changeFont() {
    document.querySelectorAll("*").forEach((elm) => (elm.style.fontFamily = "Open sans"));
}

function archiveDotIs() {
    changeFont();
    document.getElementById("CONTENT").style.border = "none";
    document.getElementById("hashtags").style.display = "none";
    document.getElementById("SOLID").style.backgroundColor = "#fff";

    const header = document.getElementById("HEADER");
    header.innerHTML = `<div style="height: 100px; width:100%"></div>`;
    header.style.backgroundColor = "#fff";
    header.style.border = "none";
    document.getElementById("DIVSHARE").nextElementSibling.style.backgroundColor = "#fff";

    let centerTag = document.querySelector("center");
    centerTag.lastElementChild.style.backgroundColor = "#fff";

    if (centerTag) {
        let divTag = document.createElement("div");
        divTag.innerHTML = centerTag.innerHTML;
        divTag.style.paddingLeft = "15px";
        divTag.style.backgroundColor = "#fff";
        centerTag.replaceWith(divTag);
    }
}

function lizDotCom() {
    document.addEventListener("contextmenu", (e) => e.stopPropagation(), true);
    changeFont();
}

function bbcDotCom() {
    document.querySelectorAll(".dotcom-ad").forEach((elm) => elm.remove());
    changeFont();
    document.querySelectorAll('[data-component="ad-slot"]').forEach((elm) => elm.remove());
    document.querySelectorAll(".pt-ad--container").forEach((elm) => elm.remove());
}

const hostname = window.location.hostname;

switch (true) {
    case hostname.includes("archive.is"):
        archiveDotIs();
        break;

    case hostname.includes("ieltsliz.com"):
        lizDotCom();
        break;

    case hostname.includes("bbc.com"):
        bbcDotCom();
        break;

    default:
        changeFont();
}
