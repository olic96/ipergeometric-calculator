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
        quest3: "Vuoi partire per primo o per secondo?",
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
    const select = document.querySelector('select[name="start-order"]');
    select.querySelector('option[value="select"]') = applicationTexts.select;
    select.querySelector('option[value="primo"]') = applicationTexts.first;
    select.querySelector('option[value="secondo"]') = applicationTexts.second;
    document.querySelector(".calculate").textContent = applicationTexts.btnCalculate;

    calculateProbability();
}

function calculateProbability() {
    // recupera i valori delle variabili N, k e n da input
    let N = Number(document.querySelector(".quest1").value);
    let k = Number(document.querySelector(".quest2").value);
    let n = Number(document.querySelector(".quest3").value);

    // calcola la probabilità di estrarre una, due o tre copie delle tre carte uguali in un campione di 5 carte
    let prob_one = 0;
    let prob_two = 0;
    let prob_three = 0;

    for (let x = 1; x <= k; x++) {
        let num = combination(k, x) * combination(N - k, n - x);
        let den = combination(N, n);
        prob_one += num / den;
    }
    prob_one = prob_one.toFixed(4);

    for (let x = 2; x <= k; x++) {
        let num = combination(k, x) * combination(N - k, n - x);
        let den = combination(N, n);
        prob_two += num / den;
    }
    prob_two = prob_two.toFixed(4);

    for (let x = 3; x <= k; x++) {
        let num = combination(k, x) * combination(N - k, n - x);
        let den = combination(N, n);
        prob_three += num / den;
    }
    prob_three = prob_three.toFixed(4);

    // visualizza il risultato
    let result = "La probabilità di estrarre almeno una carta uguale in un campione di 5 carte è:<br>";
    result += "Una copia delle tre carte uguali: " + prob_one + "<br>";
    result += "Due copie delle tre carte uguali: " + prob_two + "<br>";
    result += "Tre copie delle tre carte uguali: " + prob_three + "<br>";
    document.querySelector(".result").innerHTML = result;
}

function combination(n, k) {
    // calcola il coefficiente binomiale "n su k" (nCk)
    if (k === 0 || k === n) {
        return 1;
    } else if (k === 1 || k === n - 1) {
        return n;
    } else {
        let numerator = 1;
        let denominator = 1;
        for (let i = 0; i < k; i++) {
            numerator *= n - i;
            denominator *= k - i;
        }
        return numerator / denominator;
    }
}




init();