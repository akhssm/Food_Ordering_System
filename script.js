// =========================
// PART 1: getMenu()
// =========================
async function getMenu() {
  try {
    const response = await fetch("menu.json"); // Load menu data
    const menuData = await response.json();

    const menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = ""; // Clear any old items

    // Dynamically create menu cards
    menuData.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <div class="card-info">
          <div class="card-details">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}/-</p>
          </div>
          <button class="add-btn">+</button>
        </div>
      `;
      menuDiv.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading menu:", error);
  }
}

// =========================
// PART 2: TakeOrder()
// =========================
function TakeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("menu.json")
        .then((res) => res.json())
        .then((menu) => {
          const randomItems = [];
          while (randomItems.length < 3) {
            const randomIndex = Math.floor(Math.random() * menu.length);
            const selected = menu[randomIndex];
            if (!randomItems.includes(selected)) {
              randomItems.push(selected);
            }
          }
          const order = { items: randomItems };
          console.log("Order received:", order);
          resolve(order);
        })
        .catch((err) => reject("Error taking order: " + err));
    }, 2500);
  });
}

// =========================
// PART 3: orderPrep()
// =========================
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order prepared");
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// =========================
// PART 4: payOrder()
// =========================
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order paid");
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// =========================
// PART 5: thankyouFnc()
// =========================
function thankyouFnc(order) {
  if (order.paid) {
    alert("Thank you for eating with us! 🍔🍟");
  }
}

// =========================
// PART 6: Promise Chain
// =========================
document.getElementById("orderBtn").addEventListener("click", () => {
  const statusDiv = document.getElementById("status");
  statusDiv.innerText = "Placing your order...";

  TakeOrder()
    .then(() => {
      statusDiv.innerText = "Your order is being prepared...";
      return orderPrep();
    })
    .then(() => {
      statusDiv.innerText = "Processing payment...";
      return payOrder();
    })
    .then((orderStatus) => {
      if (orderStatus.paid) {
        statusDiv.innerText = "Payment successful!";
      }
      thankyouFnc(orderStatus);
    })
    .catch((err) => {
      console.error(err);
      statusDiv.innerText = "Something went wrong. Please try again.";
    });
});

// =========================
// Initialize menu on page load
// =========================
window.onload = getMenu;
