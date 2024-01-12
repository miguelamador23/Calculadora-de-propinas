import React, { useState } from "react";
import "./Styles.css";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [customPercentage, setCustomPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const handleReset = () => {
    setBillAmount(0);
    setSelectedButton(null);
    setCustomPercentage("");
    setNumberOfPeople(1);
    setTipAmount(0);
    setTotalAmount(0);
    setTipPerPerson(0);
    setTotalPerPerson(0);
  };

  const handleBillAmountChange = (event) => {
    setBillAmount(event.target.value);
  };

  const handleButtonClick = (event) => {
    const buttonValue = event.target.value;
    if (buttonValue === "Custom") {
      setIsCustomSelected(true);
    } else {
      setIsCustomSelected(false);
    }

    setSelectedButton(buttonValue);
    calculateTip(buttonValue);
  };

  const handleCustomInputChange = (event) => {
    const inputValue = event.target.value;
    setCustomPercentage(inputValue);
    calculateTip(inputValue);
  };

  const handleNumberOfPeopleChange = (event) => {
    const numberOfPeopleValue = event.target.value;
    setNumberOfPeople(numberOfPeopleValue);
    calculateTip(selectedButton);
  };

  const calculateTip = (percentage) => {
    const bill = parseFloat(billAmount);
    const customTip = parseFloat(customPercentage);

    let tipPercentage = 0;
    if (percentage === "Custom") {
      tipPercentage = customTip / 100;
    } else {
      tipPercentage = parseFloat(percentage) / 100;
    }

    const tipAmountValue = bill * tipPercentage;
    const totalAmountValue = bill + tipAmountValue;
    const tipPerPersonValue = tipAmountValue / numberOfPeople;
    const totalPerPersonValue = totalAmountValue / numberOfPeople;

    setTipAmount(tipAmountValue);
    setTotalAmount(totalAmountValue);
    setTipPerPerson(tipPerPersonValue);
    setTotalPerPerson(totalPerPersonValue);
  };

  return (
    <>
      <header>
        <img src="./images/logo.svg" alt="" />
      </header>
      <div className="general-wrapper">
        <div className="data-wrapper">
          <h1>Bill</h1>
          <label htmlFor="input-bill">
            <input
              className="input-bill"
              id="input-bill"
              type="number"
              min="0"
              value={billAmount}
              onChange={handleBillAmountChange}
            />
          </label>
          <ul>
            <li id="percentage-5">
              <button
                type="button"
                className={`percentage-button ${
                  selectedButton === "5" ? "active" : ""
                }`}
                value="5"
                onClick={handleButtonClick}
              >
                5%
              </button>
            </li>
            <li id="percentage-10">
              <button
                type="button"
                className={`percentage-button ${
                  selectedButton === "10" ? "active" : ""
                }`}
                value="10"
                onClick={handleButtonClick}
              >
                10%
              </button>
            </li>
            <li id="percentage-15">
              <button
                type="button"
                className={`percentage-button ${
                  selectedButton === "15" ? "active" : ""
                }`}
                value="15"
                onClick={handleButtonClick}
              >
                15%
              </button>
            </li>
            <li id="percentage-25">
              <button
                type="button"
                className={`percentage-button ${
                  selectedButton === "25" ? "active" : ""
                }`}
                value="25"
                onClick={handleButtonClick}
              >
                25%
              </button>
            </li>
            <li id="percentage-50">
              <button
                type="button"
                className={`percentage-button ${
                  selectedButton === "50" ? "active" : ""
                }`}
                value="50"
                onClick={handleButtonClick}
              >
                50%
              </button>
            </li>
            <li>
              <input
                type="number"
                placeholder="Custom"
                id="custom-percentage-button"
                className={`percentage-button ${
                  selectedButton === null || selectedButton !== "Custom"
                    ? ""
                    : "active"
                }`}
                value={customPercentage}
                onChange={handleCustomInputChange}
              />
            </li>
          </ul>
          <h2>Number of People</h2>
          <label htmlFor="input-people">
            <input
              type="number"
              placeholder="Custom"
              id="input-people"
              className="input-people"
              value={numberOfPeople}
              min="1"
              onChange={handleNumberOfPeopleChange}
            />
          </label>
        </div>
        <div className="result-wrapper">
          <div className="result-txt">
            <div className="text-amount">
              <div>
                <h2>Tip Amount</h2>
                <p>/ person</p>
              </div>
              <h3>
                $<span id="tip-amount">{tipPerPerson.toFixed(2)}</span>
              </h3>
            </div>
            <div className="total-amount">
              <div>
                <h2>Total</h2>
                <p>/ person</p>
              </div>
              <h3>
                $<span id="total">{totalPerPerson.toFixed(2)}</span>
              </h3>
            </div>
          </div>
          <button
            type="button"
            id="reset-button"
            className="reset-button"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>
    </>
  );
}
