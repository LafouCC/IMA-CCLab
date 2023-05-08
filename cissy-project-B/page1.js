localStorage.setItem("scrollPos", 0);
localStorage.setItem("display1", false);
localStorage.setItem("display2", false);
localStorage.setItem("display3", false);

window.addEventListener("scroll", showScroll);
// BOM

//document.body.addEventListener("click", fnName);
// DOM

//let value = localStorage.getItem("scrollPos");

function setup() {
    //
}

function showScroll(e) {
    let scr = window.scrollY;
    if (scr == null) return;

    storeItem("scrollPos", scr);

    if ((getItem("display1") == false || getItem("display2") == false || getItem("display3") == false) && scr > 3000) {
        window.scrollTo(0, 3000);
    }

    let frame1 = document.getElementById("canvas1Frame");
    let frame2 = document.getElementById("canvas2Frame");
    let frame3 = document.getElementById("canvas3Frame");
    let frame4 = document.getElementById("canvas4Frame");
    let frame5 = document.getElementById("canvas5Frame");
    let frame6 = document.getElementById("canvas6Frame");
    let frame7 = document.getElementById("canvas7Frame");

    let txt1 = document.getElementById("text1");
    let txt2 = document.getElementById("text2");
    if (scr >= 0 && scr < 2000) {
        //let x;
        //x = map(scr, 1000, 1500, -50, 50, true);
        //x = map(scr, 2000, 2500, 50, -50, true);
        frame1.style.display = "block";
        //frame1.style.left = x + "%";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "none";
        txt1.style.visibility = 'hidden';
    } else if (scr >= 2000 && scr < 2600) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "none";
        txt1.style.visibility = 'visible';
    }
    else if (scr >= 2600 && scr < 3000) {
        frame1.style.display = "none";
        frame2.style.display = "block";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "none";
    } else if (scr >= 3500 && scr < 6000) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "block";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "none";
    } else if (scr >= 6500 && scr < 8000) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "block";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "none";
    } else if (scr >= 8500 && scr < 9500) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "block";
        frame6.style.display = "none";
        frame7.style.display = "none";
    }
    else if (scr >= 9800 && scr < 12000) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "block";
        frame7.style.display = "none";
        txt2.style.visibility = 'hidden';
    } else if (scr >= 12000 && scr < 13500) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "block";
        txt2.style.visibility = 'hidden';
    } else if (scr >= 13500 && scr < 14000) {
        frame1.style.display = "none";
        frame2.style.display = "none";
        frame3.style.display = "none";
        frame4.style.display = "none";
        frame5.style.display = "none";
        frame6.style.display = "none";
        frame7.style.display = "none";
        txt2.style.visibility = 'visible';
    }
}