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
    updateRegistries();
    localStorage.setItem('unit', document.getElementById('unit').textContent);
}

async function loadComponent(id, file) {
    const response = await fetch(file);
    document.getElementById(id).innerHTML = await response.text();    
}

function updateRegistries(){
    const today = new Date();
    const qtd = parseInt(document.querySelector('.unit').textContent) || 0;
    const date = today.toISOString().split("T")[0];

    let registries = JSON.parse(localStorage.getItem("registries")) || [];
    
    const existingIndex = registries.findIndex(entry => entry.date === date);
    
    if (existingIndex !== -1) {
        registries[existingIndex].qtd = qtd;
    } else {
        registries.push({qtd: qtd, date: date});
    }

    localStorage.setItem("registries", JSON.stringify(registries));
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
    const unitSaved = localStorage.getItem('unit');
    const dailyGoalSaved = localStorage.getItem('dailyGoal');


    if (volumeSaved) {
        volumeInput.value = volumeSaved;
    }

    if (dailyGoalSaved) {
        dailyGoal.value = localStorage.getItem('dailyGoal');
    }

    if (unitSaved) {
        unitDisplay.textContent = unitSaved;
        units = unitSaved;
        updateAll();
    }

    volumeInput.addEventListener('input', function() {
        localStorage.setItem('volumeGarrafa', this.value);
    });

    dailyGoal.addEventListener('input', function() {
        localStorage.setItem('dailyGoal', this.value);
    });
});
