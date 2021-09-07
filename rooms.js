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
            <button onclick="deleteRoom()"></button>
          </div>
          </button>
        `;
      });
    });
}

getRooms();

function deleteRoom() {
  let roomId = fetch(`https://hotel-p.herokuapp.com/delete-room/${roomId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (!res.data) {
        document.querySelector("#error"), (innerHTML = "user not found");
        return;
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "./rooms.html";
      }
    });
}
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

function addToCart(id) {
  let room = rooms.find((item) => {
    return item[0] == id;
  });
  console.log(room);
  carts.push(room);
  console.log(carts);
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

function renderBooking(bookingItems) {
  let bookingContainer = document.querySelector(".rooms-bg");
  bookingContainer.innerHTML = "";
  carts.forEach((item) => {
    bookingContainer.innerHTML += `
    <div class="room-carts">
      <p>${item[1]}</p>
    </div>
    
    `;
  });
}

function toggleBooking() {
  document.querySelector("#rooms").classList.toggle("active");
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
    </div>
    
    `;
  });
}
