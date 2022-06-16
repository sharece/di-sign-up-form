import { FormValidateinator } from "./form-validation.js";

const selectors = {
  button: ".form__button",
  errorMsg: ".form__error",
  input: ".form__input",
  inputError: "form__input_error",
  errorMsgClass: "form__error_show",
};

const trialForm = document.querySelector(".form_contact-form");

const trialFormValidaterinator = new FormValidateinator(selectors, trialForm);
trialFormValidaterinator.enableValidation();
