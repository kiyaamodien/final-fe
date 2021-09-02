// fetch("https://hotel-p.herokuapp.com/")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

function login() {
  // data from form
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  console.log(email, password);

  //data to api
  fetch("https://hotel-p.herokuapp.com/login/", {
    method: "PATCH",
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
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

function signup() {
  let susername = document.querySelector("#username").value;
  let semail = document.querySelector("#email").value;
  let slast_name = document.querySelector("#last_name").value;
  let spassword = document.querySelector("#password").value;
  console.log(susername, semail, spassword);

  fetch("https://hotel-p.herokuapp.com/user-registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: susername,
      last_name: slast_name,
      email: semail,
      password: spassword,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status_code == 201) {
        document.querySelector("#error").innerHTML =
          "You have successfully signed up, sign in to continue";
        setTimeout(function () {
          window.location.href = "./index.html";
        }, 3000);
      }
    });
}
