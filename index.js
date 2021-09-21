// Necessary DOM elements
const inputBill = document.querySelector("#bill");
const inputNumberOfPeople = document.querySelector("#people");
const tipsContainer = document.querySelector(".tips");
const btnReset = document.querySelector(".btn--reset");
const btnTips = document.querySelectorAll(".btn--tip");
const inputCustomActive = document.querySelector(".btn--custom");
const amountPerPerson = document.querySelector("#amount-person");
const amountTotal = document.querySelector("#amount-total");

/* FORMULAS */
// total tip: bill * percentage / 100
// tip per peson: total tip / number of people

// Initial values
let totalTip = 0,
  tipPerPerson = 0;
let bill = 0,
  tip = 0,
  numberOfPeople = 0;

// Calculate and render total tip amount
const calculateTotalTip = function () {
  totalTip = (Math.round(((bill * tip) / 100) * 100) / 100).toFixed(2);
  amountTotal.textContent = `$${totalTip}`;
  btnReset.classList.add("btn--reset__active");
  calculateTipPerPerson();
};

// Calculate tip per person
const calculateTipPerPerson = function () {
  if (numberOfPeople <= 0) return;
  tipPerPerson = (Math.round((totalTip / numberOfPeople) * 100) / 100).toFixed(
    2
  );
  amountPerPerson.textContent = `$${tipPerPerson}`;
};

// Check if input value is valid or not
const isValueZero = function (value) {
  if (value <= 0 || value === undefined || value === null) {
    this.classList.add("input--error");
    checkAndCalculate();
    return true;
  } else {
    this.classList.remove("input--error");
    return false;
  }
};

const resetValues = function () {
  bill = tip = numberOfPeople = 0;
  inputBill.value = inputNumberOfPeople.value = "";
  inputCustomActive.placeholder = "Custom";
  amountPerPerson.textContent = `$0.00`;
  amountTotal.textContent = "$0.00";
  btnTips.forEach((el) => el.classList.remove("btn--tip__active"));
};

const checkAndCalculate = function (value) {
  if (!isValueZero.call(this, value)) {
    if (this.id === "bill") bill = value;
    if (this.id === "tip") tip = value;
    if (this.id === "people") numberOfPeople = value;
    calculateTotalTip();
  }
};

// Display error message when value is invalid for all three inputs
[(inputBill, inputCustomActive, inputNumberOfPeople)].forEach((input) => {
  input.addEventListener("focus", function (e) {
    const value = e.target.value;
    checkAndCalculate.call(this, value);
  });

  input.addEventListener("focusout", function (e) {
    this.classList.remove("input--error");
  });
});

// Calculate and display the tip values whenever inputs change
[inputBill, inputCustomActive, inputNumberOfPeople].forEach((input) => {
  input.addEventListener("input", function (e) {
    const value = e.target.value;
    checkAndCalculate.call(this, value);
  });
});

// Calculate and display total tip whenever the tip button gets clicked
tipsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn--tip");
  if (!btn) return;

  btnTips.forEach((el) => el.classList.remove("btn--tip__active"));
  btn.classList.add("btn--tip__active");
  const val = btn.textContent.replace(/\D/g, "");
  tip = val;
  calculateTotalTip();
});

// Reset all the values and render them
btnReset.addEventListener("click", function () {
  if (this.classList.contains("btn--reset__active")) {
    // set bill = 0, tip = 0, numberofpeople = 0 then calculate and display the total tip
    resetValues();
    calculateTotalTip();
    this.classList.remove("btn--reset__active");
  }
});
