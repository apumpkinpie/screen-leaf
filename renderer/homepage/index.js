// const mainBtn = document.querySelector('#main-btn');
// const counterEl = document.querySelector('#counter');
// const imgInput = document.querySelector('#img-input');
// const img = document.querySelector('#img-container');

// let counter = 0;
// mainBtn.addEventListener('click', () => {
//     counter++;
//     counterEl.textContent = counter;
// });
// imgInput.addEventListener('change', (e) => {
//     console.log('triggered');
//     const file = e.target.files[0];
//     console.log(file);
//     const image = new Image();
//     image.src = URL.createObjectURL(file);
//     img.src = `${file.path}`
//     image.onload = function () {
//         img.style.height = `${this.height / this.width * 50}px`;
//     };
// });

const sliderInput = document.getElementById("my-range");
const sliderValue = document.getElementById("current-brightness");
// const setButton = document.getElementById("btn");
sliderInput.addEventListener("input", () => {
    sliderValue.textContent = sliderInput.value;
});
sliderInput.addEventListener('change', (params) => {
    const brightness = sliderInput.value;
    window.myAPI.setBrightness(+brightness / 100.0);

})

