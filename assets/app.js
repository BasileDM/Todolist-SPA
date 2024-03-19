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
                const option = document.createElement("option");
                option.textContent = category.NAME;
                const categoriesElement = document.querySelector("#taskCategory");
                categoriesElement.appendChild(option);
            }
        });
}