let taskCategories = [];

function fetchCategories() {
    fetch("./../src/getCategories.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Categories not found.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            const categoriesElement = document.querySelector("#taskCategory");
            categoriesElement.innerHTML = "";
            data.forEach(category => {
                const inputId = `btn-check-${category.ID}`;
                const labelFor = `btn-check-${category.ID}`;
                const input = `<input type="checkbox" class="btn-check" id="${inputId}" autocomplete="off">`;
                const label = `<label class="btn" for="${labelFor}">${category.NAME}</label>`;
                categoriesElement.insertAdjacentHTML("beforeend", input);
                categoriesElement.insertAdjacentHTML("beforeend", label);

                const inputElement = document.querySelector(`#${inputId}`);
                const labelElement = document.querySelector(`#${labelFor}`);

                inputElement.addEventListener("change", function () {
                    if (inputElement.checked) {
                        console.log(`Checked ${category.ID}`);
                    } else {
                        console.log('Not checked ' + category.ID);
                    }
                });
            });
        })
}

function checkTaskForm () {
    const title = document.querySelector("#taskTitle").value;
    const description = document.querySelector("#taskDescription").value;
    const dueDate = document.querySelector("#taskDueDate").value;
    const priority = document.querySelector("#taskPriority").value;
}