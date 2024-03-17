function checkField(fieldId) {
    let fieldElement = document.getElementById(fieldId);

    // Field checks
    if (fieldElement.value.length < fieldElement.min || fieldElement.value.length > fieldElement.max) {
        fieldElement.classList.add("is-invalid");
        displaySignupError(`Field must be between ${fieldElement.min} and ${fieldElement.max} characters long.`, fieldId);
        disableSignupButton();
        return;
    }

    // If field has passed all checks :
    // Remove invalid class and error message
    fieldElement.classList.remove("is-invalid");
    if (element = document.getElementById(`${fieldId}-error-ctn`)) {
        element.remove();
    }
    fieldElement.classList.add("is-valid");

    // Check if one of the fields is still invalid :
    if (document.querySelectorAll(".is-invalid").length > 0) {
        disableSignupButton();
    } else {
        enableSignupButton();
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
    signupButton.disabled = true;
}

function enableSignupButton() {
    const signupButton = document.getElementById("signup-button");
    signupButton.disabled = false;
}
