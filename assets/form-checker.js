let isLastNameValid = false;
let isFirstNameValid = true;
let isMailValid = false;
let isPasswordValid = false;
let isPasswordConfirmValid = false;

function checkField(fieldId) {
    let fieldElement = document.getElementById(fieldId);

    // Field checks
    if (fieldElement.required || fieldElement.value.length > 0) {
        if (fieldElement.value.length < fieldElement.min || fieldElement.value.length > fieldElement.max) {
            fieldElement.classList.add("is-invalid");
            invalidateField(fieldId);
            displaySignupError(
                `Field must be between ${fieldElement.min} and ${fieldElement.max} characters long.`,
                fieldId
            );
            disableSignupButton();
            return;
        }
    }

    // If field has passed all checks :
    // Remove invalid class and error message
    fieldElement.classList.remove("is-invalid");
    if ((element = document.getElementById(`${fieldId}-error-ctn`))) {
        element.remove();
    }

    // Make field valid
    fieldElement.classList.add("is-valid");
    validateField(fieldId);

    // Check if all fields are valid and if both passwords match
    if (isLastNameValid && isFirstNameValid && isMailValid && isPasswordValid && isPasswordConfirmValid) {
        if (checkPasswordConfirm()) {
            enableSignupButton();
        } else {
            disableSignupButton();
        }
    }
}

function displaySignupError(message, fieldId) {
    if (!document.getElementById(`${fieldId}-error-ctn`)) {
        const errorContainer = `<div class="alert alert-danger p-2 mt-2" role="alert" id="${fieldId}-error-ctn"></div>`;
        document.getElementById(fieldId).insertAdjacentHTML("afterend", errorContainer);
    }
    document.getElementById(`${fieldId}-error-ctn`).textContent = message;
}

function disableSignupButton() {
    const signupButton = document.getElementById("signup-button");
    signupButton.classList.add("disabled");
}

function enableSignupButton() {
    const signupButton = document.getElementById("signup-button");
    signupButton.classList.remove("disabled");
}

function checkPasswordConfirm() {
    let password = document.getElementById("inputPassword").value;
    let passwordConfirm = document.getElementById("inputPasswordConfirm").value;

    if (password === passwordConfirm) {
        document.getElementById("inputPasswordConfirm").classList.remove("is-invalid");
        document.getElementById("inputPassword").classList.remove("is-invalid");
        document.getElementById("inputPasswordConfirm").classList.add("is-valid");
        document.getElementById("inputPassword").classList.add("is-valid");
        return true;
    } else {
        displaySignupError("Passwords don't match !", "inputPasswordConfirm");
        document.getElementById("inputPasswordConfirm").classList.remove("is-valid");
        document.getElementById("inputPassword").classList.remove("is-valid");
        document.getElementById("inputPasswordConfirm").classList.add("is-invalid");
        document.getElementById("inputPassword").classList.add("is-invalid");
        return false;
    }
}

function validateField(fieldId) {
    switch (fieldId) {
        case "inputLastName":
            isLastNameValid = true;
            break;

        case "inputFirstName":
            isFirstNameValid = true;
            break;

        case "inputMail":
            isMailValid = true;
            break;

        case "inputPassword":
            isPasswordValid = true;
            break;

        case "inputPasswordConfirm":
            isPasswordConfirmValid = true;
            break;

        default:
            break;
    }
}

function invalidateField(fieldId) {
    switch (fieldId) {
        case "inputLastName":
            isLastNameValid = false;
            break;

        case "inputFirstName":
            isFirstNameValid = false;
            break;

        case "inputMail":
            isMailValid = false;
            break;

        case "inputPassword":
            isPasswordValid = false;
            break;

        case "inputPasswordConfirm":
            isPasswordConfirmValid = false;
            break;

        default:
            break;
    }
}
