const inputBill = document.querySelector("#bill");
const inputNumberOfPeople = document.querySelector("#people");
const tipsContainer = document.querySelector(".tips");
const btnReset = document.querySelector(".btn--reset");
const btnTips = document.querySelectorAll(".btn--tip");
const inputCustomActive = document.querySelector(".btn--custom");
const amountPerPerson = document.querySelector("#amount-person");
const amountTotal = document.querySelector("#amount-total");

let totalTip = 0,
  tipPerPerson = 0;
// total tip: bill * percentage / 100
// tip per peson: total tip / number of people

let bill = 0,
  tip = 0,
  numberOfPeople = 0;

const calculateTotalTip = function () {
  totalTip = (Math.round(((bill * tip) / 100) * 100) / 100).toFixed(2);
  amountTotal.textContent = `$${totalTip}`;
  btnReset.classList.add("btn--reset__active");
  calculateTipPerPerson();
};

const calculateTipPerPerson = function () {
  if (numberOfPeople <= 0) return;
  tipPerPerson = (Math.round((totalTip / numberOfPeople) * 100) / 100).toFixed(
    2
  );
  amountPerPerson.textContent = `$${tipPerPerson}`;
};

const isValueZero = function (value) {
  if (value <= 0) {
    this.classList.add("input--error");
    return true;
  } else {
    this.classList.remove("input--error");
    return false;
  }
};

[inputBill, inputCustomActive, inputNumberOfPeople].forEach((input) => {
  input.addEventListener("focus", function (e) {
    const value = e.target.value;
    isValueZero.call(this, value);
  });

  input.addEventListener("focusout", function (e) {
    this.classList.remove("input--error");
  });
});

inputBill.addEventListener("input", function (e) {
  const value = e.target.value;
  if (!isValueZero.call(this, value)) {
    bill = value;
    calculateTotalTip();
  }
});
inputCustomActive.addEventListener("input", function (e) {
  const value = e.target.value;
  if (!isValueZero.call(this, value)) {
    tip = value;
    calculateTotalTip();
  }
});
inputNumberOfPeople.addEventListener("input", function (e) {
  const value = e.target.value;
  if (!isValueZero.call(this, value)) {
    numberOfPeople = value;
    calculateTotalTip();
  }
});

tipsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn--tip");
  if (!btn) return;

  btnTips.forEach((el) => el.classList.remove("btn--tip__active"));
  btn.classList.add("btn--tip__active");
  const val = btn.textContent.replace(/\D/g, "");
  tip = val;
  calculateTotalTip();
});

btnReset.addEventListener("click", function () {
  if (this.classList.contains("btn--reset__active")) {
    // set bill = 0, tip = 0, numberofpeople = 0 then calculate and display the total tip
    bill = tip = numberOfPeople = 0;
    inputBill.value = inputNumberOfPeople.value = 0;
    inputCustomActive.placeholder = "Custom";
    amountPerPerson.textContent = `$0.00`;
    btnTips.forEach((el) => el.classList.remove("btn--tip__active"));
    calculateTotalTip();
    this.classList.remove("btn--reset__active");
  }
});
