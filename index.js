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

const checkInput = function (value) {
  if (value <= 0) this.classList.add("input--error");
  else this.classList.remove("input--error");
};

inputBill.addEventListener("focus", function (e) {
  const value = e.target.value;
  checkInput.call(this, value);
});

inputBill.addEventListener("focusout", function (e) {
  this.classList.remove("input--error");
});

inputBill.addEventListener("input", function (e) {
  const value = e.target.value;
  checkInput.call(this, value);
});

tipsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn--tip");
  if (!btn) return;

  btnTips.forEach((el) => el.classList.remove("btn--tip__active"));
  btn.classList.add("btn--tip__active");
});

inputCustomActive.addEventListener("focus", function (e) {
  const value = e.target.value;
  checkInput.call(this, value);
});
inputCustomActive.addEventListener("focusout", function (e) {
  this.classList.remove("input--error");
});
inputCustomActive.addEventListener("input", function (e) {
  const value = e.target.value;
  checkInput.call(this, value);
});
