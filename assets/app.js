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
                return response.text();
            }
        })
        .then((data) => {
            document.getElementById("categories").innerHTML = data;
        });
}