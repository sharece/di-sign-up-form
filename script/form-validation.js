/**
 * Steps to create this validation class
 *
 * 1. create the constructor and accept the selectors (emphasis on selectors)
 * 2. create public function to enable validation to begin (also to stop the form from submitting and refreshing the page)

* 3. create a private function to setup event listeners for the inputs and button
 *   a. on "input" check if the input is valid and toggle the button
 * 4. create private function that checks if an input is valid element.validity.valid
 * 5. create private function to show or hide error message element.validationMessage
 * 6. create private function to enable or disable the button if all inputs are valid or if some are invalid
 * 7. create public function to reset validation by toggling the button and hiding all the error messages
 */

export class FormValidateinator {
  #inputElements = null;
  #buttonElement = null;

  constructor(selectors, form) {
    this.inputSelector = selectors.input;
    //
    this.buttonSelector = selectors.button;
    //selects button
    this.errorMsgSelector = selectors.errorMsg;
    //finds error msg to display when invalid
    this.inputErrorClass = selectors.inputError;
    //add to input when it's invalid
    this.formElement = form;
    this.errorMsgClass = selectors.errorMsgClass;
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // this is preventing this default URL autorefill
    });

    this.#setUpEventListeners();
  }
  #setUpEventListeners() {
    this.#inputElements = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
    );
    this.#buttonElement = this.formElement.querySelector(this.buttonSelector);

    this.#inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButton();
      });
    });
    this.#toggleButton();
  }
  #checkInputValidity(element) {
    const errorMsgElement = element.parentElement.querySelector(
      this.errorMsgSelector
    );
    if (element.validity.valid) {
      this.#setInputValid(element, errorMsgElement);
    } else {
      this.#setInputInvalid(element, errorMsgElement);
    }
  }

  #setInputValid(element, errorMsgElement) {
    element.classList.remove(this.inputErrorClass);
    errorMsgElement.classList.remove(this.errorMsgClass);
    errorMsgElement.innerText = "";
  }

  #setInputInvalid(element, errorMsgElement) {
    element.classList.add(this.inputErrorClass);
    errorMsgElement.classList.add(this.errorMsgClass);
    errorMsgElement.innerText = element.validationMessage;
  }
  #toggleButton() {
    if (this.#hasInvalidInputs()) {
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.disabled = false;
    }
  }

  #hasInvalidInputs() {
    return this.#inputElements.some((input) => !input.validity.valid);
  }

  resetForm() {
    this.#inputElements.forEach((input) => {
      input.value = "";
      input.classList.remove(this.inputErrorClass);
    });
    this.formElement
      .querySelectorAll(this.errorMsgSelector)
      .forEach((errorMsgElement) => {
        errorMsgElement.classList.remove(this.errorMsgClass);
        errorMsgElement.innerText = "";
      });
    this.#toggleButton();
  }
}
