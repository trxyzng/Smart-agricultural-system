
//mainscript
let offbnt1 = document.getElementById("offbtn1")
let offbnt2 = document.getElementById("offbtn2")
let offbnt3 = document.getElementById("offbtn3")
let onbnt1 = document.getElementById("onbtn1")
let onbnt2 = document.getElementById("onbtn2")
let onbnt3 = document.getElementById("onbtn3")
let img1 = document.getElementById("img1")
let img2 = document.getElementById("img2")
let img3 = document.getElementById("img3")


offbtn1.onclick = function () {
    img1.src = "/img/light_off.png"
    offbnt1.style.backgroundColor = "rgba(240, 24, 24, 1)"
    onbnt1.style.backgroundColor = "rgba(9, 154, 48, 0.6)"
    firebase.database().ref("Devices/Led").set(0)
}
onbtn1.onclick = function () {
    img1.src = "/img/light_on.png"
    offbnt1.style.backgroundColor = "rgba(240, 24, 24, 0.6)"
    onbnt1.style.backgroundColor = "rgba(9, 154, 48, 1)"
    firebase.database().ref("Devices/Led").set(1)
}

offbtn2.onclick = function () {
    img2.src = "/img/fan_off.png"
    offbnt2.style.backgroundColor = "rgba(240, 24, 24, 1)"
    onbnt2.style.backgroundColor = "rgba(9, 154, 48, 0.6)"
    firebase.database().ref("Devices/Fan").set(0)
}
onbtn2.onclick = function () {
    img2.src = "/img/fan_on.png"
    offbnt2.style.backgroundColor = "rgba(240, 24, 24, 0.6)"
    onbnt2.style.backgroundColor = "rgba(9, 154, 48, 1)"
    firebase.database().ref("Devices/Fan").set(1)
}

offbtn3.onclick = function () {
    img3.src = "/img/water_off.png"
    offbnt3.style.backgroundColor = "rgba(240, 24, 24, 1)"
    onbnt3.style.backgroundColor = "rgba(9, 154, 48, 0.6)"
    firebase.database().ref("Devices/Pump").set(0)
}
onbtn3.onclick = function () {
    img3.src = "/img/water_on.png"
    offbnt3.style.backgroundColor = "rgba(240, 24, 24, 0.6)"
    onbnt3.style.backgroundColor = "rgba(9, 154, 48, 1)"
    firebase.database().ref("Devices/Pump").set(1)
}

let information_number = document.getElementsByClassName("information-number");


firebase.database().ref("Devices/Led").on('value', snap => {
    let value = snap.val();
    if (value == 1) {
        img1.src = "/img/light_on.png"
        offbnt1.style.backgroundColor = "rgba(240, 24, 24, 0.6)"
        onbnt1.style.backgroundColor = "rgba(9, 154, 48, 1)"
    }
    if (value == 0) {
        img1.src = "/img/light_off.png"
        offbnt1.style.backgroundColor = "rgba(240, 24, 24, 1)"
        onbnt1.style.backgroundColor = "rgba(9, 154, 48, 0.6)"
    }
});

firebase.database().ref("Devices/Fan").on('value', snap => {
    let value = snap.val();
    if (value == 1) {
        img2.src = "/img/fan_on.png"
        offbnt2.style.backgroundColor = "rgba(240, 24, 24, 0.6)"
        onbnt2.style.backgroundColor = "rgba(9, 154, 48, 1)"
    }
    if (value == 0) {
        img2.src = "/img/fan_off.png"
        offbnt2.style.backgroundColor = "rgba(240, 24, 24, 1)"
        onbnt2.style.backgroundColor = "rgba(9, 154, 48, 0.6)"
    }
});

firebase.database().ref("Devices/Pump").on('value', snap => {
    let value = snap.val();
    if (value == 1) {
        img3.src = "/img/water_on.png"
        offbnt3.style.backgroundColor = "rgba(240, 24, 24, 0.6)"
        onbnt3.style.backgroundColor = "rgba(9, 154, 48, 1)"
    }
    if (value == 0) {
        img3.src = "/img/water_off.png"
        offbnt3.style.backgroundColor = "rgba(240, 24, 24, 1)"
        onbnt3.style.backgroundColor = "rgba(9, 154, 48, 0.6)"
    }
});

firebase.database().ref("Information/Light").on('value', snap => information_number[0].innerText = snap.val());
firebase.database().ref("Information/Temperature").on('value', snap => information_number[1].innerText = snap.val());
firebase.database().ref("Information/Humidity").on('value', snap => information_number[2].innerText = snap.val());
//auto mode
let target_block = document.getElementsByClassName("target-block");
let target_number = document.getElementsByClassName("target-number");
let auto = document.getElementById("auto-mode-btn");

let num1 = 0;
let num2 = 0;
let num3 = 0;

firebase.database().ref("Mode/Light_target").on('value', snap => {num1 = snap.val();
    target_number[0].innerText = num1;
});
firebase.database().ref("Mode/Temperature_target").on('value', snap => {num2 = snap.val()
    target_number[1].innerText = num2;
});
firebase.database().ref("Mode/Humidity_target").on('value', snap => {num3 = snap.val()
    target_number[2].innerText = num3;
});

firebase.database().ref("Mode/Auto").on('value', snap => {
    if (snap.val() == 1) {
        auto.innerText = "ON";
        auto.style.background = "green";
        for (let x = 0; x < 3; x++) {
            target_block[x].style.opacity = "1";
            target_block[x].style.pointerEvents = "auto";
        }
    }
    else {
        auto.innerText = "OFF";
        auto.style.background = "red";
        for(let x=0;x<3;x++){
            target_block[x].style.opacity = "0.3";
            target_block[x].style.pointerEvents = "none";
        }
    }
});

auto.onclick = function () {
    if (auto.innerText == "OFF") {
        auto.innerText = "ON";
        auto.style.background = "green";
        for (let x = 0; x < 3; x++) {
            target_block[x].style.opacity = "1";
            target_block[x].style.pointerEvents = "auto";
        }
        firebase.database().ref("Mode/Auto").set(1)
    }
    else {
        auto.innerText = "OFF";
        auto.style.background = "red";
        for (let x = 0; x < 3; x++) {
            target_block[x].style.opacity = "0.1";
            target_block[x].style.pointerEvents = "none";
        }
        firebase.database().ref("Mode/Auto").set(0)
    }
}

//up down btn1
let up_btn1 = document.getElementById("up-btn1")
up_btn1.onclick = function () {
    if (num1 == 10000) {
        num1 = 10000;
    }
    else {
        num1 += 100;
        target_number[0].innerText = num1;
        firebase.database().ref("Mode/Light_target").set(num1);
    }
}
let down_btn1 = document.getElementById("down-btn1")
down_btn1.onclick = function () {
    if (num1 == 100) {
        num1 = 100;
    }
    else {
        num1 -= 100;
        target_number[0].innerText = num1;
        firebase.database().ref("Mode/Light_target").set(num1);
    }
}

let up_btn2 = document.getElementById("up-btn2")
up_btn2.onclick = function () {
    if (num2 == 50) {
        num2 = 50;
    }
    else {
        num2 += 1;
        target_number[1].innerText = num2;
        firebase.database().ref("Mode/Temperature_target").set(num2);
    }
}
let down_btn2 = document.getElementById("down-btn2")
down_btn2.onclick = function () {
    if (num2 == 1) {
        num2 = 1;
    }
    else {
        num2 -= 1;
        target_number[1].innerText = num2;
        firebase.database().ref("Mode/Temperature_target").set(num2);
    }
}

//up-down btn3
let up_btn3 = document.getElementById("up-btn3")
up_btn3.onclick = function () {
    if (num3 == 95) {
        num3 = 95;
    }
    else {
        num3 += 1;
        target_number[2].innerText = num3;
        firebase.database().ref("Mode/Humidity_target").set(num3);
    }
}
let down_btn3 = document.getElementById("down-btn3")
down_btn3.onclick = function () {
    if (num3 == 1) {
        num3 = 1;
    }
    else {
        num3 -= 1;
        target_number[2].innerText = num3;
        firebase.database().ref("Mode/Humidity_target").set(num3);
    }
}