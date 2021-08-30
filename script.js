fetch("https://hotel-p.herokuapp.com/")
.then((res) => res.json())
.then((data) => {
    console.log(data);
});