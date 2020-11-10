// API KEY
const key = 'ff43dc8de70f112322225d2a';

const from = document.querySelector('#from-input');
const to = document.querySelector('#to-input');

const currencyFrom = document.querySelector('#from');
const currencyTo = document.querySelector('#to');

const conversionRate = document.getElementById('conversion_rate_p');

const swap = document.querySelector('.swap');

// SET SELECT OPTIONS
async function setOptions() {

    try {
        const res = await fetch(`https://open.exchangerate-api.com/v6/latest`);
        const data = await res.json();

        currencyFrom.remove(currencyFrom.value);
        currencyTo.remove(currencyTo.value);

        for (x in data.rates) {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');

            option1.text = x;
            option1.value = x;

            option2.text = x;
            option2.value = x;

            currencyFrom.add(option1);
            currencyTo.add(option2);
        }
    } 
    
    catch (error) {
        alert(error);
    }
}

// CURRENCY CONVERSION
async function calculate() {

    try {
        const fromValue = currencyFrom.value;
        const toValue = currencyTo.value;

        const input = from.value;

        const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/${fromValue}`, {mode: 'cors'});
        const data = await res.json();

        rates = data.conversion_rates;
        to.value = input * rates[currencyTo.value];

        conversionRate.innerText = `1 ${fromValue} = ${rates[currencyTo.value]} ${toValue}`;
    }

    catch (error) {
        alert(error);
    }

}


// SWAP BUTTON EVENT LISTENER
const swapFunction = () => {
    const temp = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;

    calculate();
}

setOptions();

from.addEventListener('input', calculate);
currencyFrom.addEventListener('change', calculate);
currencyTo.addEventListener('change', calculate);

swap.addEventListener('click', swapFunction);

calculate();