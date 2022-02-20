document.body.onload = function () { onLoad() };
// if not defined
if (typeof (patchySpawner) == "undefined") {
    let patchySpawner = '';
}

async function onLoad() {
    let aTags = document.getElementsByTagName("a");
    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].innerHTML == "Patchouli?") {
            console.log("Found Patchouli!");
            patchySpawner = aTags[i]
        }
    }
    if (patchySpawner) {
        patchySpawner.onclick = () => { spawn_patchy() };
        patchySpawner.removeAttribute("href");
    }


    await startPatchy();
}
