const quotes = [
"Success is not final, failure is not fatal: it is the courage to continue that counts.",
"Believe you can and you are halfway there.",
"Dream big and dare to fail.",
"Do something today that your future self will thank you for.",
"The secret of getting ahead is getting started."
];

quotes.forEach((quote, index) => {
console.log(`Quote ${index + 1}: ${quote}`);
});

let eventDate = new Date("January 1, 2027 00:00:00").getTime();

let daysElement = document.querySelector("#days");
let hoursElement = document.querySelector("#hours");
let minutesElement = document.querySelector("#minutes");
let secondsElement = document.querySelector("#seconds");
let countdownStatus = document.querySelector("#countdownStatus");
let toggleCountdownButton = document.querySelector("#toggleCountdown");

let slidesContainer = document.querySelector("#slidesContainer");
let prevSlideButton = document.querySelector("#prevSlide");
let nextSlideButton = document.querySelector("#nextSlide");
let slideCounter = document.querySelector("#slideCounter");

let welcomeModal = document.querySelector("#welcomeModal");
let closeModalButton = document.querySelector("#closeModal");

let countdownInterval;
let slideInterval;
let isCountdownRunning = true;
let currentSlide = 0;

let totalSlides = document.querySelectorAll(".slide").length;

let formatTime = (value) => String(value).padStart(2, "0");

let updateCountdown = () => {
let now = new Date().getTime();
let difference = eventDate - now;

if (difference <= 0) {
clearInterval(countdownInterval);

daysElement.textContent = "00";
hoursElement.textContent = "00";
minutesElement.textContent = "00";
secondsElement.textContent = "00";

countdownStatus.textContent = "Time's up! The event has started 🎉";
toggleCountdownButton.textContent = "Finished";
toggleCountdownButton.disabled = true;
return;
}

let days = Math.floor(difference / (1000 * 60 * 60 * 24));
let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
let minutes = Math.floor((difference / (1000 * 60)) % 60);
let seconds = Math.floor((difference / 1000) % 60);

daysElement.textContent = formatTime(days);
hoursElement.textContent = formatTime(hours);
minutesElement.textContent = formatTime(minutes);
secondsElement.textContent = formatTime(seconds);
};

let startCountdown = () => {
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
isCountdownRunning = true;
toggleCountdownButton.textContent = "Pause Countdown";
countdownStatus.textContent = "Timer is running.";
};

let pauseCountdown = () => {
clearInterval(countdownInterval);
isCountdownRunning = false;
toggleCountdownButton.textContent = "Start Countdown";
countdownStatus.textContent = "Timer is paused.";
};

toggleCountdownButton.addEventListener("click", () => {
if (isCountdownRunning) pauseCountdown();
else startCountdown();
});

let showSlide = (slideNumber) => {
currentSlide = (slideNumber + totalSlides) % totalSlides;
slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
slideCounter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
};

let nextSlide = () => showSlide(currentSlide + 1);
let previousSlide = () => showSlide(currentSlide - 1);

let resetAutoSlide = () => {
clearInterval(slideInterval);
slideInterval = setInterval(nextSlide, 4000);
};

nextSlideButton.addEventListener("click", () => {
nextSlide();
resetAutoSlide();
});

prevSlideButton.addEventListener("click", () => {
previousSlide();
resetAutoSlide();
});

setTimeout(() => {
welcomeModal.classList.add("show");
}, 5000);

closeModalButton.addEventListener("click", () => {
welcomeModal.classList.remove("show");
});

startCountdown();
showSlide(0);
slideInterval = setInterval(nextSlide, 4000);