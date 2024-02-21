const d = document;

d.addEventListener("DOMContentLoaded", () => {
    main()
})

function main() {
    configureNavButtons();
    configurePhaseButtons();
    configureFunToggle();
}

var fun_toggle = 1;
function configureFunToggle() {
    d.querySelector(".fun-toggle").onclick = () => {
        fun_toggle = (fun_toggle + 1) % 5;
        if (fun_toggle == 0) {
            sphereGoto("inside");
        }
        if (fun_toggle == 1) {
            sphereGoto("side");
        }
        if (fun_toggle == 2) {
            sphereGoto("bottom");
        }
        if (fun_toggle == 3) {
            sphereGoto("top");
        }
        if (fun_toggle == 4) {
            sphereGoto("overview");
        }

    };
}

function configureNavButtons() {
    for (let btn of query("button")) {
        if (btn.getAttribute("nav-to") == null) {
            continue;
        }
        let nav = btn.getAttribute("nav-to");
        let splash = btn.getAttribute("splash");
        if (splash != null) {
            btn.style.background = `linear-gradient(var(--dark-transparant), var(--dark-transparant)), center / cover no-repeat url(./pages/${splash}/splash.png`;
        }

        btn.onclick = async (ev) => {
            console.log("go to: ", nav);
            d.querySelector("#main-page").hidden = true;
            d.querySelector("#markdown-page").hidden = false;

            // load markdown
            let path = `pages/${nav}`;
            let res = await fetch(path);
            let text = await res.text();

            let html = "";
            if (path.endsWith("html")) {
                html = text;
            }
            if (path.endsWith("md")) {
                var converter = new showdown.Converter();
                html = converter.makeHtml(text);
            }

            d.querySelector("#markdown-container").innerHTML = html;
        };
    }

    d.querySelector(".back-button").onclick = () => {
        d.querySelector("#main-page").hidden = false;
        d.querySelector("#markdown-page").hidden = true;
        for (let phase_1 of getElementsByClassName("phase-1")) {
            phase_1.hidden = false;
        }
        for (let phase_2 of getElementsByClassName("phase-2")) {
            phase_2.hidden = true;
        }
    };
}



function sphereGoto(tag = "inside") {
    d.querySelector("canvas").setAttribute("data-goto", tag);
}

function configurePhaseButtons() {
    d.getElementById("next-phase").onclick = () => {
        console.log("poep");

        for (let phase_1 of getElementsByClassName("phase-1")) {
            phase_1.hidden = true;
        }
        for (let phase_2 of getElementsByClassName("phase-2")) {
            phase_2.hidden = false;
        }

    };
}

/**
 * 
 * @param {string} name 
 * @returns {Element[]}
 */
function getElementsByClassName(name = "") {
    return Array.from(d.getElementsByClassName(name));
}
function query(q = "") {
    return Array.from(d.querySelectorAll(q));
}