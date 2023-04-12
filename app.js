function getApplicationTexts() {
    const applicationTexts =
    {   // quest //
        quest1: "Quante carte hai nel tuo deck?",
        quest2: "Quante copie giochi di questa carta?",
        quest3: "Quante copie di quella carta vorresti in mano?",
        quest4: "Vuoi partire per primo o per secondo?",
        // start //
        select: "Seleziona",
        first: "Primo",
        second: "Secondo",
    }
    return applicationTexts;
}

function init() {
    const applicationTexts = getApplicationTexts();

    document.querySelector(".quest1").textContent = applicationTexts.quest1;
    document.querySelector(".quest2").textContent = applicationTexts.quest2;
    document.querySelector(".quest3").textContent = applicationTexts.quest3;
    document.querySelector(".quest4").textContent = applicationTexts.quest4;

    const select = document.querySelector('select[name="start-order"]');
    select.querySelector('option[value="select"]').textContent = applicationTexts.select;
    select.querySelector('option[value="primo"]').textContent = applicationTexts.first;
    select.querySelector('option[value="secondo"]').textContent = applicationTexts.second;

    document.querySelector(".calculate").addEventListener("click", calc);

    // Aggiungi un listener per il reset del form
    document.querySelector(".reset-btn").addEventListener("click", function () {
        // Riimposta i valori degli input al loro valore di default
        document.querySelector(".input1").value = null;
        document.querySelector(".input2").value = null;
        document.querySelector(".input3").value = null;
        document.querySelector('select[name="start-order"]').value = "select";

        // Resetta anche il risultato
        document.querySelector(".result").textContent = "";

        // Resetta sessione
        chrome.storage.local.remove(["population", "numSuccessInPopulation", "numSuccessInSample", "sampleSize"], function () {
            console.log("Parametri rimossi.");
        });
    });

    // Ripristina i valori salvati nelle variabili
    chrome.storage.local.get(["population", "numSuccessInPopulation", "numSuccessInSample", "sampleSize"], function (data) {
        if (data.population) {
            document.querySelector(".input1").value = data.population;
        }
        if (data.numSuccessInPopulation) {
            document.querySelector(".input2").value = data.numSuccessInPopulation;
        }
        if (data.numSuccessInSample) {
            document.querySelector(".input3").value = data.numSuccessInSample;
        }
        if (data.sampleSize) {
            select.value = data.sampleSize;
        }
    });
}
function calc() {
    let population = document.querySelector(".input1").value;
    let numSuccessInPopulation = document.querySelector(".input2").value;
    let sampleSize = null;
    const select = document.querySelector('select[name="start-order"]');
    if (select.value === "primo") {
        sampleSize = 5;
    } else if (select.value === "secondo") {
        sampleSize = 6;
    } else {
        sampleSize = 0;
    }
    let numSuccessInSample = document.querySelector(".input3").value;

    if (population < 40 || population > 60 || isNaN(population)) {
        alert("Il tuo deck deve avere tra le 40 e 60 carte!");
        return;
    }
    if (numSuccessInPopulation < 1 || numSuccessInPopulation > 3 || isNaN(numSuccessInPopulation)) {
        alert("Puoi giocare solo da 1 a 3 copie di questa carta!");
        return;
    }
    if (numSuccessInSample < 0 || numSuccessInSample > 3 || isNaN(numSuccessInSample)) {
        alert("Non puoi avere più copie in mano di quelle che giochi!");
        return;
    }
    if (sampleSize == 0) {
        alert("Devi scegliere come partire!");
        return;
    }

    function iperGeoProb(population, numSuccessInPopulation, sampleSize, numSuccessInSample) {
        let prob = (choose(numSuccessInPopulation, numSuccessInSample) * choose(population - numSuccessInPopulation, sampleSize - numSuccessInSample)) / choose(population, sampleSize);
        return prob;
    }

    function choose(n, k) {
        if (k > n) {
            return 0;
        }
        let res = 1;
        for (let i = 1; i <= k; i++) {
            res *= (n - i + 1) / i;
        }
        return res;
    }
    let prob = iperGeoProb(population, numSuccessInPopulation, sampleSize, numSuccessInSample);

    let copia = null;
    if (numSuccessInSample == 1) {
        copia = "copia";
    } else if (numSuccessInSample == 0 || numSuccessInSample == 2 || numSuccessInSample == 3) {
        copia = "copie";
    }

    // Salva i valori delle variabili
    chrome.storage.local.set({
        "population": population,
        "numSuccessInPopulation": numSuccessInPopulation,
        "numSuccessInSample": numSuccessInSample,
        "sampleSize": select.value
    });

    // stampa
    let message = `La probabilità di avere ${numSuccessInSample} ${copia} in mano è del ${prob.toFixed(4) * 100}%.`;
    let result = document.querySelector(".result").innerHTML = message;

    return result;
}

init();