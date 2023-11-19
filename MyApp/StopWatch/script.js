const hour = document.querySelector(".hh");
const minute = document.querySelector(".mm");
const second = document.querySelector(".ss");

const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");

function addZero(num) {
    if (String(num).length === 1) return `0${num}`;
    return `${num}`;
}

function hhmmssConverter(seconds) {
    let hh = Math.trunc(seconds / 3600);
    let mm = Math.trunc((seconds % 3600) / 60);
    let ss = Math.trunc((seconds % 3600) % 60);

    hh = addZero(hh);
    mm = addZero(mm);
    ss = addZero(ss);

    hour.textContent = hh;
    minute.textContent = mm;
    second.textContent = ss;
    // console.log({ hh, mm, ss });
}

function reset() {
    hour.textContent = "00";
    minute.textContent = "00";
    second.textContent = "00";
    counter = 0;
}

function clearCounter() {
    clearInterval(counterID);
    counterID = 0;
}

let counter = 1;
let counterID;

const makeCounter = () => counter++;
const showDisplay = () => hhmmssConverter(makeCounter());

startBtn.addEventListener("click", () => {
    if (!counterID) counterID = setInterval(showDisplay, 1000);
});

stopBtn.addEventListener("click", () => {
    clearCounter();
});

resetBtn.addEventListener("click", () => {
    clearCounter();
    reset();
});
