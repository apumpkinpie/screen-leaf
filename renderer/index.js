const mainBtn = document.querySelector('#main-btn');
const counterEl = document.querySelector('#counter');
let counter = 0;
mainBtn.addEventListener('click', () => {
    counter++;
    counterEl.textContent = counter;
});