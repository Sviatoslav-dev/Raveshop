/* eslint-env browser */
document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.querySelectorAll(".remove_button");

    for (let i = 0; i < removeButtons.length; i += 1) {
        removeButtons[i].addEventListener("click", (event) => {
            let item = event.target.parentElement.parentElement;
            const id = parseInt(item.id.slice(5), 10);
            console.log(id);

            let basket = localStorage.getItem("basket");
            if (basket !== null) {
            basket = JSON.parse(basket);
            } else {
            basket = {};
            }
            delete basket[id];
            localStorage.setItem("basket", JSON.stringify(basket));
            console.log(localStorage.getItem("basket"));
            item.remove();
        });
    }
});
