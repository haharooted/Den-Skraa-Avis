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
      console.log(bruger)
    
     fetch("http://localhost:1337/api/brugere/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bruger),
      })
        .then((response) => {
          if (response.ok) {
            location.href = "/login.html";
            window.alert("Du er nu oprettet")
          } else {
            window.alert("Der skete en fejl ved oprettelse af brugeren");
          }
        })
        .catch((err) => {
          console.log("Der skete en fejl ved oprettelse af brugeren");
        });
    });
  });
