/* eslint-env browser */
document.addEventListener("DOMContentLoaded", () => {
  const basketButton = document.querySelector("#basket_button");
  const addButtons = document.querySelectorAll(".add_button");

  localStorage.removeItem("basket");

  basketButton.addEventListener("click", () => {
    let basket = localStorage.getItem("basket");
    if (basket !== null) {
      basket = JSON.parse(basket);

      let count = 0;
      Object.keys(basket).forEach(() => {
        count += 1;
      });

      if (count > 0) {
        let getBody = "?";
        Object.keys(basket).forEach((key) => {
          getBody += `${key.toString()}=`;
          getBody += basket[key].toString();
          getBody += "&";
        });
        getBody = getBody.slice(0, -1);
        document.location.href = `/basket${getBody}`;
      }
    }
  });

  for (let i = 0; i < addButtons.length; i += 1) {
    addButtons[i].addEventListener("click", (event) => {
      let count = prompt("Please enter amount", "1"); // eslint-disable-line no-alert
      count = parseInt(count, 10);

      const id = parseInt(event.target.id.slice(7), 10);

      let basket = localStorage.getItem("basket");
      if (basket !== null) {
        basket = JSON.parse(basket);
      } else {
        basket = {};
      }
      basket[id] = count;
      localStorage.setItem("basket", JSON.stringify(basket));
    });
  }
});
