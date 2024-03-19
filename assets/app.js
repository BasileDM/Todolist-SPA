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
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const category = data[i];
                let input = `<input type="checkbox" class="btn-check" id="btn-check-${category.ID}" autocomplete="off">`;
                let label = `<label class="btn" for="btn-check-${category.ID}">${category.NAME}</label>`;
                const categoriesElement = document.querySelector("#taskCategory");
                categoriesElement.innerHTML += input;
                categoriesElement.innerHTML += label;
            }
        });
}