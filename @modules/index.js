set("./@modules/progress/index.js", ()=>{
var hostPage = location.protocol+"//"+location.host;

function getText(page){
    var request = new XMLHttpRequest();
    request.open('GET', `${hostPage}/pages/${page}.html`, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.statusText == "OK") {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text/html") != 1) {
                document.dispatchEvent(new CustomEvent("CEA-textLoaded",{detail:request.responseText}))
            }
        }
    }
}

function change(page){
    return new Promise((resolve,reject)=>{
        document.addEventListener("CEA-textLoaded",t=>{
            const text = t.detail

            document.documentElement.innerHTML = text

            // Scripts start

            const scripts = document.querySelectorAll("script")

            scripts.forEach(script=>{
                const newScript = document.createElement("script")
                newScript.attributes = script.attributes
                newScript.innerText = script.innerText
                script.replaceWith(newScript)
            })

            resolve();
        })

        getText(page);
    })
}

})