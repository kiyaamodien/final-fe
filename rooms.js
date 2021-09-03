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
          <div class="room-card">
            <h3 class="room-name">${room[1]}</h3>
            <p class="room-type">${room[2]}</p>
            <p class="room-image">${room[3]}
            <p class="price">${room[4]}</p>
            <p class="room-view">${room[5]}</p>
          </div>
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
