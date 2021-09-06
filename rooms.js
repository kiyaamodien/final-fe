let rooms = [];
let carts = [];

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

function getRooms() {
  fetch(`https://hotel-p.herokuapp.com/rooms/`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      document.querySelector(
        "#greeting"
      ).innerHTML = `Hi there ${user.username}`;
      res["data"].forEach((room) => {
        document.querySelector("#rooms").innerHTML += `
        <button onclick="addToCart(${room.room_id})" class="room-s">Click on Room to add to Cart
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
          </div>
          </button>
        `;
      });
    });
}

getRooms();

// delete rooms
// function deleteRoom() {

//   let roomId =
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
// function showRooms(products) {
//   let container = document.querySelector("#rooms");
//   container.innerHTML += ``;

//   rooms.forEach((rooms) => {
//     container.innerHTML += `
//     <div class="room-card">
//         <img src="room-img" src="${room.image}" alt="">
//         <h3 class="room-name">${room.name}</h3>
//         <p class="room-type">${room.type}</p>
//         <p class="price">R${price}</p>
//         <p class="room-view">${room.view}</p>
//       </div>
//       `;
//   });
// }

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
  } else fetRooms(searchedRooms);
}

function logout() {
  localStorage.clear();
  window.location = "./index.html";
}

function toggleCreaateRoomModal() {
  document.querySelector("#create-room-modal").classList.toggle("active");
}

function renderBooking(cartItems) {
  let bookingContainer = document.querySelector("#booking");
  bookingContainer.innerHTML = "";
  if (bookingItems.length > 0) {
    bookingItems.map((bookingItem) => {
      bookingContianer.innerHTML += `
      <div class="room">
  <img src="${bookingItem.image}" class="room-image">
          <div class="room-content"></div>
            <h3 class="room-name">${room[1]}</h3>
            <p class="room-type">${room[2]}</p>
            <img class="room-image" src='${room[3]}'>/
            <p class="price">${room[4]}</p>
            <p class="room-view">View/${room[5]}</p>
          </div>
          </div>`;
    });
  }
}

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}
