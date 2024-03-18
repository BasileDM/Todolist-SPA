let isLastNameValid = false;
let isFirstNameValid = true;
let isMailValid = false;
let isPasswordValid = false;
let isPasswordConfirmValid = false;

function checkField(fieldId) {
    let fieldElement = document.getElementById(fieldId);

    // If is mail, undergo regex check
    if (fieldId == 'inputMail') {
        if (!checkMailRegex(fieldElement.value)) {
            invalidateField(fieldId);
            displaySignupError("Invalid email format", fieldId);
            disableSignupButton();
            return;
        }
    }

    // Field checks
    if (fieldElement.required || fieldElement.value.length > 0) {
        if (fieldElement.value.length < fieldElement.min || fieldElement.value.length > fieldElement.max) {
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

    validateField(fieldId);

    // Check if all fields are valid and if both passwords match
    if (checkAllFields()) {
        enableSignupButton();
    } else {
        disableSignupButton();
    }
}

function checkAllFields() {
    if (checkPasswordConfirm() && isLastNameValid && isFirstNameValid && isMailValid && isPasswordValid && isPasswordConfirmValid) {
        return true;
    } else {
        return false;
    }
}

function checkPasswordConfirm() {
    let password = document.getElementById("inputPassword").value;
    let passwordConfirm = document.getElementById("inputPasswordConfirm").value;

    if (password === passwordConfirm && password.length != 0 && passwordConfirm.length != 0) {
        document.getElementById("inputPasswordConfirm").classList.remove("is-invalid");
        document.getElementById("inputPassword").classList.remove("is-invalid");
        document.getElementById("inputPasswordConfirm").classList.add("is-valid");
        document.getElementById("inputPassword").classList.add("is-valid");
        if (document.getElementById('inputPasswordConfirm-error-ctn')) {
            document.getElementById("inputPasswordConfirm-error-ctn").classList.add("d-none");
        }
        return true;
    } else if (password.length != 0 && passwordConfirm.length != 0) {
        displaySignupError("Passwords don't match !", "inputPasswordConfirm");
        document.getElementById("inputPasswordConfirm").classList.remove("is-valid");
        document.getElementById("inputPassword").classList.remove("is-valid");
        document.getElementById("inputPasswordConfirm").classList.add("is-invalid");
        document.getElementById("inputPassword").classList.add("is-invalid");
        return false;
    }
}

function checkMailRegex(mail) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(mail).toLowerCase())) {
        return regex.test(String(mail).toLowerCase());
    } else {
        return false;
    }
}

function validateField(fieldId) {
    let fieldElement = document.getElementById(fieldId);

    // Remove invalid class and error message
    fieldElement.classList.remove("is-invalid");
    if ((element = document.getElementById(`${fieldId}-error-ctn`))) {
        element.remove();
    }

    // Add valid class
    fieldElement.classList.add("is-valid");

    // Make bool valid
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
    let fieldElement = document.getElementById(fieldId);
    fieldElement.classList.add("is-invalid");
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

function disableSignupButton() {
    const signupButton = document.getElementById("signup-button");
    signupButton.classList.add("disabled");
}

function enableSignupButton() {
    const signupButton = document.getElementById("signup-button");
    signupButton.classList.remove("disabled");
}

function signup() {
    checkField("inputLastName");
    checkField("inputFirstName");
    checkField("inputMail");
    checkField("inputPassword");
    checkField("inputPasswordConfirm");
    checkPasswordConfirm();

    if (checkAllFields()) {
        fetch("/../src/signup.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lastName: document.getElementById("inputLastName").value,
                firstName: document.getElementById("inputFirstName").value,
                mail: document.getElementById("inputMail").value,
                password: document.getElementById("inputPassword").value,
                passwordConfirm: document.getElementById("inputPasswordConfirm").value,
            }),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw new Error("Backend response was not ok");
                } else {
                    return response.text();
                }
            })
            .then((data) => {
                switch (data) {
                    case "Error: 1":
                        displayToast("Signup Error", "Please fill in all the fields.", "error");
                        break;
                    case "Error: 2":
                        displayToast("Signup Error", "Last name must be between 3 and 50 characters.", "error");
                        displaySignupError("Last name must be between 3 and 50 characters", "inputLastName");
                        break;
                    case "Error: 3":
                        displayToast("Signup Error", "First name must be between 3 and 50 characters.", "error");
                        displaySignupError("First name must be between 3 and 50 characters", "inputFirstName");
                        break;
                    case "Error: 4":
                        displayToast("Signup Error", "Email must be between 3 and 80 characters.", "error");
                        displaySignupError("Email must be between 3 and 80 characters", "inputMail");
                        break;
                    case "Error: 5":
                        displayToast("Signup Error", "Invalid email format.", "error");
                        displaySignupError("Invalid email format", "inputMail");
                        break;
                    case "Error: 6":
                        displayToast("Signup Error", "Password must be between 7 and 99 characters.", "error");
                        displaySignupError("Password must be between 7 and 99 characters", "inputPassword");
                        break;
                    case "Error: 7":
                        displayToast("Signup Error", "Passwords don't match.", "error");
                        displaySignupError("Passwords don't match", "inputPasswordConfirm");
                        break;
                    case "Error: 8":
                        displayToast("Signup Error", "Email already in use.", "error");
                        displaySignupError("Email already in use", "inputMail");
                        break;
                    case "success":
                        displayToast("Account created !", "You can now log in.", "success");
                        break;
                    default:
                        console.log("Unknown error: " + data);
                        break;
                }
            });
    }
}
