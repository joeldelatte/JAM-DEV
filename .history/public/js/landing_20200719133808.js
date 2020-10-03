//implement this or similiar and call in below onSumbit
// function ValidateEmail(mail) {
//   if (
//     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//       myForm.emailAddr.value
//     )
//   ) {
//     return true;
//   }
//   alert("You have entered an invalid email address!");
//   return false;
// }

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var subscribe = document.querySelector(".footer-form");

subscribe.addEventListener("submit", function (event) {
  event.preventDefault();

  const fName = document.querySelector("#fName").value;
  const lName = document.querySelector("#lName").value;
  const email = document.querySelector("#email").value;

  const data = {
    firstName: fName,
    lastName: lName,
    email: email
  };

  const options_1 = {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (validateEmail(email)) {

    fetch("/api/subscription", options_1)
      .then((res) => {
        res.json();
      })
      .then()
      .catch((err) => {
        console.error("Error:", err);
      });
  } else

  

});

