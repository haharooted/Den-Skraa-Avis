document.addEventListener("DOMContentLoaded", async (e) => {
  const bruger2 = JSON.parse(localStorage.getItem("bruger"));
  if (bruger2) {
    location.href = "./index.html"
  }
    document.getElementById("form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const bruger = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value, 
        lokation: document.getElementById("lokation").value,
        navn: document.getElementById("navn").value,
        telefon: document.getElementById("telefon").value
      };

    
     await fetch("http://localhost:1338/api/brugere/opretbruger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bruger),
      })
        .then((response) => {
          if (response) {
            location.href = "/login.html";
          } else {
            window.alert("Der skete en fejl ved oprettelse af brugeren");
          }
        })
        .catch((err) => {
          console.log("Der skete en fejl ved oprettelse af brugeren");
        });
    });
  });
