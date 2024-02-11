const d = document;

d.addEventListener("DOMContentLoaded", () => {
    main()
})

function main() {
    configureNavButtons();
    configurePhaseButtons();
}

function configureNavButtons() {
    for (let btn of query("button")) {
        if (btn.getAttribute("nav-to") == null) {
            continue;
        }
        let nav = btn.getAttribute("nav-to");
        let splash = btn.getAttribute("splash");
        if (splash != null) {
            btn.style.background = `linear-gradient(rgba(0.3, 0.3, 0.3, 0.8), rgba(0.3, 0.3, 0.3, 0.8)), center / cover no-repeat url(./pages/${splash}/splash.png`;
        }
        
        btn.onclick = (ev) => {
            console.log("go to: ", nav);
            
        };
    }
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
function getElementsByClassName(name="") {
    return Array.from(d.getElementsByClassName(name));
}
function query(q="") {
    return Array.from(d.querySelectorAll(q));
}