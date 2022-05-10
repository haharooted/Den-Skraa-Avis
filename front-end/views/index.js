document.addEventListener("DOMContentLoaded", async (event) => {
    let brugerTilId = JSON.parse(localStorage.getItem("bruger"))
    if (!brugerTilId) {
      location.href = "./login.html"
  } else {
    id = brugerTilId.id
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
              location.href = "./login.html"
          }
          })
          .catch(() => {
            location.href = "./login.html"
          });
      }});
      document.getElementById("annonceKnap").addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "./annoncer.html"
      });
      document.getElementById("profilKnap").addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "./profil.html"
      });