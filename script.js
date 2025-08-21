const increaseBtn = document.getElementById('increaseBtn');
const descreaseBtn = document.getElementById('descreaseBtn');
const unitDisplay = document.querySelector('.unit');
const volumeInput = document.getElementById('volume');
const qtd = document.getElementById('qtd');

let units = 0;
function updateDisplay() {
    unitDisplay.textContent = units;
}

function updateQtd(){
    const fltVolume = parseFloat(volumeInput.value) || 0;
    const total = units * fltVolume;
    qtd.textContent = total;
}

//Event Listeners
increaseBtn.addEventListener('click', () => {
    units++;
    updateDisplay();
    updateQtd();
});

descreaseBtn.addEventListener('click', ()=>{
    if (units > 0){
        units--;
        updateDisplay();
        updateQtd();
    }
});