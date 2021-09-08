let rooms = [];
let carts = [];

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

function getRooms() {
  fetch(`https://hotel-p.herokuapp.com/rooms/`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      rooms = res.data;
      let container = document.querySelector("#rooms-container");
      container.innerHTML = "";
      document.querySelector(
        "#greeting"
      ).innerHTML = `Hi there ${user.username}`;
      rooms.forEach((room) => {
        container.innerHTML += `
        <button onclick="addToCart(${room[0]})" class="room-s">Click on Room to add to Cart
          <div class="room-card">
            <select id="framework">
              <option value="1">1d</option>
              <option value="2">2d</option>
              <option value="3">3d.</option>
              <option value="4">4d.</option>
            </select>
            <h3 class="room-name">${room[1]}</h3>
            <p class="room-type">${room[2]}</p>
            <img class="room-image" src='${room[3]}'>/
            <p class="price">${room[4]}</p>
            <p class="room-view">View/${room[5]}</p>
            <button class="delete_r" onclick="deleteRoom(${room[0]})"></button>
          </div>
          </button>
        `;
      });
    });
  let totalPrice = cart.reduce(
    (total, item) => total + parseInt(item, price),
    0
  );
  container.innerHTML += `<h3> Total is: ${totalPrice} </h3>`;
}

//run delete_rooms function
document
  .querySelectorAll(".delete_r")
  .forEach((button) => button.addEventListener("click", remove));

// remove room in cart
function delete_r(e) {
  let id = e.target.id;
  for (let item in carts) {
    if (id == carts[item][0]) {
      carts.splice(item, 1);
      window.localStorage.setItem("cart", JSON.stringify(carts));
      renderBooking();
    }
  }
}

getRooms();

// function deleteRoom(roomId) {
//   fetch(`https://hotel-p.herokuapp.com/delete-room/${roomId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       if (!res.data) {
//         document.querySelector("#error"), (innerHTML = "user not found");
//         return;
//       } else {
//         localStorage.setItem("user", JSON.stringify(res.data));
//         window.location.href = "./rooms.html";
//       }
//     });
// }

function addToCart(id) {
  let room = rooms.find((item) => {
    return item[0] == id;
  });
  console.log(room);
  carts.push(room);
  console.log(carts);
}

function removeCart(id) {
  if (id == carts[0]) {
    carts.pop();
  }
}

function checkout() {
  let cart = "";
  alert("payment successful");
}

function searchedForRooms() {
  let searchTerm = document.querySelector("#searchTerm").Value;
  console.log(searchTerm);

  let searchedRooms = rooms.filter((room) =>
    room[1].toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchedRooms);
  getRooms(searchedRooms);

  if (searchedRooms.length == 0) {
    document.querySelector("#rooms").innerHTML =
      "<h2>Unable to find room or, room unavailable<h2>";
  } else getRooms(searchedRooms);
}

function logout() {
  localStorage.clear();
  window.location = "./index.html";
}

function toggleCreaateRoomModal() {
  document.querySelector("#create-room-modal").classList.toggle("active");
}

function renderBooking() {
  let bookingContainer = document.querySelector(".rooms-bg");
  bookingContainer.innerHTML = "";
  carts.forEach((item) => {
    bookingContainer.innerHTML += `
    <div class="room-carts">
      <p>${item[1]}</p>
      <p>${item[2]}</p>
      <img class="room-image" src='${item[3]}'>/
      <p>${item[4]}</p>
      <p>${item[5]}</p>
      <button id='${item[0]}' class='deletefrmcrt'>Delete</button>
    </div>
    
    
    `;
  });
  document
    .querySelectorAll(".deletefrmcrt")
    .forEach((button) => button.addEventListener("click", delete_r));
}

function toggleBooking() {
  document.querySelector("#rooms").classList.toggle("active");
  renderBooking();
}
