const increaseBtn = document.getElementById('increaseBtn');
const descreaseBtn = document.getElementById('descreaseBtn');
const unitDisplay = document.querySelector('.unit');
const volumeInput = document.getElementById('volume');
const qtd = document.getElementById('qtd');
const dailyGoal = document.getElementById('dailyGoal');

let units = 0;
function updateDisplay() {
    unitDisplay.textContent = units;
}

function updateQtd(){
    const fltVolume = parseFloat(volumeInput.value) || 0;
    const total = units * fltVolume;
    qtd.textContent = total;
}

async function updateWaterLevel() {
    const bottle = document.getElementById('bottle');
    const fltVolume = parseFloat(volumeInput.value) || 0;
    const totalWater = units * fltVolume;
    const fltDailyGoal = parseFloat(dailyGoal.value)

    let percentage = (100 * totalWater)/fltDailyGoal;

    bottle.style.background = `linear-gradient(to top, #AADBF8 ${percentage}%, white 0%)`;
}

function updateAll(){
    updateDisplay();
    updateQtd();
    updateWaterLevel();
}

async function loadComponent(id, file) {
    const response = await fetch(file);
    document.getElementById(id).innerHTML = await response.text();    
}

//Event Listeners
increaseBtn.addEventListener('click', () => {
    units++;
    updateAll();
});

descreaseBtn.addEventListener('click', ()=>{
    if (units > 0){
        units--;
        updateAll();
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const volumeInput = document.getElementById('volume');
    const volumeSaved = localStorage.getItem('volumeGarrafa');

    if (volumeSaved) {
        volumeInput.value = volumeSaved;
    }

    if (dailyGoal) {
        dailyGoal.value = localStorage.getItem('dailyGoal');
    }

    volumeInput.addEventListener('input', function() {
        localStorage.setItem('volumeGarrafa', this.value);
    });

    dailyGoal.addEventListener('input', function() {
        localStorage.setItem('dailyGoal', this.value);
    });
});

