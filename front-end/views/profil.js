document.addEventListener("DOMContentLoaded", (event) => {
  const bruger = JSON.parse(localStorage.getItem("bruger"));

  let brugerTilId = JSON.parse(localStorage.getItem("bruger"));
  if (!brugerTilId) {
    location.href = "./login.html";
  } else {
    let id = brugerTilId.id;
    fetch(`http://localhost:1337/api/brugere/checkbruger/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log("Logget ind");
        } else {
          location.href = "./login.html";
        }
      })
      .catch(() => {
        location.href = "./login.html";
      });
  }

  fetch(`http://localhost:1337/api/brugere/checkbruger/${bruger.id}`).then((res) => {
    res.json().then((data) => {
      let temp = "";

      temp += "<li>Navn: " + data.navn;
      temp += "<br>Email: " + data.email;
      temp += "<br>Password: " + data.password;
      //temp += "<br>Lokation: " + data.lokation;
      temp += "<br>Telefon: " + data.telefon;
      temp += "<br>Dato for oprettelse: " + data.createdAt;
      if (!data.createdAt === data.updatedAt) {
        temp += "<br>Sidst redigeret: " + data.updatedAt;
      }
      temp += "</li>";

      document.getElementById("email").value = data.email;
      document.getElementById("password").value = data.password;
      //document.getElementById("lokation").value = data.lokation;
      document.getElementById("navn").value = data.navn;
      document.getElementById("telefon").value = data.telefon;

      document.getElementById("tilføjItem").innerHTML = temp;
    });
  });

  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const lokation = document.getElementById("lokation").value;
    const navn = document.getElementById("navn").value;
    const telefon = document.getElementById("telefon").value;
    const password = document.getElementById("password").value;
    const brugerLocal = JSON.parse(localStorage.getItem("bruger"));

    const brugerInfo = {
      email: email,
      password: password,
      lokation: lokation,
      navn: navn,
      telefon: telefon,
      id: brugerLocal.id,
    };

    fetch("http://localhost:1337/api/brugere/opdaterbruger", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brugerInfo),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          location.href = "./profil.html";
        } else {
          window.alert("Der skete en fejl ved opdatering af profil");
        }
      })
      .catch(() => {
        window.alert("Fejl ved opdatering af bruger");
      });
  });

  document.getElementById("logudknap").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("bruger")
    location.href = "login.html"
  });
  document.getElementById("sletbrugerknap").addEventListener("click", (e) => {
    e.preventDefault();
    let id = brugerTilId.id;
     fetch(`http://localhost:1337/api/brugere/sletbruger/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.removeItem("bruger")
          window.alert("Bruger blev slettet, redirecter til forsiden...")
          location.href = "login.html"
        } else {
          window.alert("Bruger ikke slettet, der skete en fejl")
        }
      })
      .catch( (err) => {
        window.alert("Bruger ikke slettet, der skete en fejl: " + err)
      });

  });

  
});
