function getApplicationTexts() {
    const applicationTexts =
    {   // convalidation //
        zero: "Hai il %s % di probabilità di non vedere questa carta!",
        one: "Hai il %s % di probabilità di vedere una copia di questa carta!",
        two: "Hai il %s % di probabilità di vedere due copie di questa carta!",
        three: "Hai il %s % di probabilità di vedere tre copie di questa carta!",
        // btns //
        btnCalculate: "Calcola probabilità",
        // quest //
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
    document.querySelector(".calculate").textContent = applicationTexts.btnCalculate;

    const select = document.querySelector('select[name="start-order"]');
    select.querySelector('option[value="select"]').textContent = applicationTexts.select;
    select.querySelector('option[value="primo"]').textContent = applicationTexts.first;
    select.querySelector('option[value="secondo"]').textContent = applicationTexts.second;

    document.querySelector(".calculate").addEventListener("click", calc);
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
        alert("Non puoi avere più copie in mano di quelle che giochi!.");
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

    // stampa
    let message = "La probabilità di avere " + numSuccessInSample + " copia/e in mano è del " + prob.toFixed(4) + ".";
    let result = document.querySelector(".result").innerHTML = message;

    return result
}

init();