const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
async function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/5803142f96bc63d8948122d7/latest/${currency_one}`
  );
  const data = await response.json();
  // console.log(data);
  const rate = data.conversion_rates[currency_two];
  //   console.log(rate);
  rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
}

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
