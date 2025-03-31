const link = "https://r.pouekdev.one/";
function copyToClipboard(text) {
    const final = link + text;
    navigator.clipboard.writeText(final);
}