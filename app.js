function getApplicationTexts() {
    const applicationTexts =
    {   // convalidation //
        zero: "Hai il %s % di probabilità di non vedere questa carta!",
        one: "Hai il %s % di probabilità di vedere una copia di questa carta!",
        two: "Hai il %s % di probabilità di vedere due copie di questa carta!",
        three: "Hai il %s % di probabilità di vedere tre copie di questa carta!",
        // btns //
        btnCalculate: "Calcola",
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

    document.querySelector(".calculate").addEventListener("click", calculateProbability);

}

init();


// giusta

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

let population = 40;
let numSuccessInPopulation = 3;
let sampleSize = 5;
let numSuccessInSample = 3;
let prob = iperGeoProb(population, numSuccessInPopulation, sampleSize, numSuccessInSample);
console.log(prob)