const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');


function calculate() {

    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;


    if (currency_one != 'NRP' && currency_two != 'NRP') {
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const rate = data.rates[currency_two];
                // console.log(rate);
                amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
            });
    } else if (currency_two == 'NRP') {
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const rate = data.rates['USD'];
                console.log(rate);
                amountEl_two.value = (amountEl_one.value * rate * 121.03).toFixed(2);
            });
    } else {
        fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then(res => res.json())
            .then(data => {
                const rate = data.rates[currency_two];
                amountEl_two.value = (amountEl_one.value * rate * 0.0083).toFixed(2);


            })
    }
}

//event listeners 

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});
calculate();