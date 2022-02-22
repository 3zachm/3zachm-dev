document.body.onload = function () { onLoad() };
// if not defined
if (typeof (patchySpawner) == "undefined") {
    let patchySpawner = [];
}

async function onLoad() {
    let aTags = document.getElementsByTagName("a");
    patchySpawner = [];
    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].innerHTML == "Patchouli?") {
            patchySpawner.push(aTags[i]);
        }
    }
    if (patchySpawner) {
        patchySpawner.forEach(element => {
            element.onclick = () => { spawn_patchy() };
            element.removeAttribute("href");
        });
    }
    document.onkeydown = function (e) {
        if (e.key == "p") {
            spawn_patchy();
        }
    }


    await startPatchy();
}
