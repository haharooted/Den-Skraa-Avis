document.addEventListener("DOMContentLoaded", async (event) => {
  const bruger = JSON.stringify(localStorage.getItem("bruger"));
  let brugerTilId = JSON.parse(localStorage.getItem("bruger"))
  if (!brugerTilId) {
    location.href = "./login.html"
} else {
    let id = brugerTilId.id
    fetch(`http://localhost:1338/api/brugere/checkbruger/${id}`, {
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
    }
   fetch(`http://localhost:1338/api/getAnnoncer`).then(
      res => {
        res.json().then(
          data => {
            if (data.length > 0) {
              var temp = "";
              data.forEach((annonce) => {
                temp += "<li>Titel: " + annonce.titel
                temp += "<br>Pris: " + annonce.pris + " kr."
                temp += "<br>Oprettelsesdato: " + annonce.dato
                temp += "<br>Beskrivelse: " + annonce.beskrivelse
                temp += "<br>Kategori: " + annonce.kategori
                temp += '<br><a href=""><img src="./uploads/' + annonce.billedeUrl + '" alt="icon" width="300px" height="300px" class=""/></a>'
                temp += "</li>"
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  });