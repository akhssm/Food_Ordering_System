// Fetch and display menu items
async function getMenu() {
  try {
    const response = await fetch("menu.json");
    const menuData = await response.json();

    const menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";

    menuData.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}/-</p>
      `;
      menuDiv.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading menu:", error);
  }
}

// Simulate order
function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("menu.json")
        .then((res) => res.json())
        .then((menu) => {
          const randomItems = [];
          for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * menu.length);
            randomItems.push(menu[randomIndex]);
          }

          const order = {
            items: randomItems,
            orderStatus: "received",
          };
          console.log("Order received:", order);
          resolve(order);
        });
    }, 2500);
  });
}

// Simulate preparation
function orderPrep(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.orderStatus = "prepared";
      console.log("Order prepared");
      resolve(order);
    }, 1500);
  });
}

// Simulate payment
function payOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.paid = true;
      console.log("Order paid");
      resolve(order);
    }, 1000);
  });
}

// Thank you message
function thankyouFnc(order) {
  if (order.paid) {
    document.getElementById("status").innerText =
      "Thank you for dining with us! 🍽️";
  }
}

// Full process
document.getElementById("orderBtn").addEventListener("click", () => {
  const statusDiv = document.getElementById("status");
  statusDiv.innerText = "Placing your order...";

  TakeOrder()
    .then((order) => {
      statusDiv.innerText = "Your order is being prepared...";
      return orderPrep(order);
    })
    .then((order) => {
      statusDiv.innerText = "Processing payment...";
      return payOrder(order);
    })
    .then((order) => {
      thankyouFnc(order);
    })
    .catch((err) => console.error("Error:", err));
});

window.onload = getMenu;
