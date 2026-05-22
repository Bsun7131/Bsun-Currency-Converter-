async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  const result = document.getElementById("result");
  const rateInfo = document.getElementById("rateInfo");

  if (amount === "" || amount <= 0) {
    result.textContent = "Please enter a valid amount";
    rateInfo.textContent = "";
    return;
  }

  try {
    result.textContent = "Converting...";
    rateInfo.textContent = "Fetching live exchange rate...";

    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();

    const rate = data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  } catch (error) {
    result.textContent = "Conversion failed";
    rateInfo.textContent = "Please check your internet connection.";
  }
}

function swapCurrencies() {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  convertCurrency();
}

convertCurrency();
