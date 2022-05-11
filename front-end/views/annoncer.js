document.addEventListener("DOMContentLoaded", async (event) => {
  const bruger = JSON.stringify(localStorage.getItem("bruger"));
  let brugerTilId = JSON.parse(localStorage.getItem("bruger"))
  let kategori = document.getElementById("kategori").value;
  let lokation = document.getElementById("lokation").value;

  if (!brugerTilId) {
    location.href = "./login.html"
} else {
    let id = brugerTilId.id
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
    }
   fetch(`http://localhost:1337/api/produkter/getprodukterall`).then(
      res => {
        res.json().then(
          data => {
            if (data.length > 0) {
              var temp = "";
              data.forEach((annonce) => {
                temp += "<li>Titel: " + annonce.titel
                temp += "<br>Pris: " + annonce.pris + " kr."
                temp += "<br>Oprettelsesdato: " + annonce.createdAt
                temp += "<br>Beskrivelse: " + annonce.beskrivelse
                temp += "<br>Kategori: " + annonce.kategori
                temp += '<br><a href=""><img src="./uploads/' + annonce.billedeUrl + '" alt="icon" width="300px" height="300px" class=""/></a>'
                temp += `<br>`
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.id}"><button class="makegold">Følg annonce</button></a>`
                temp += "</li>"
                
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  });
  
  function opdaterKnap() {
       valgtKategori = document.getElementById("kategori").value;
       valgtLokation = document.getElementById("lokation").value;

      fetch(`http://localhost:1337/api/brugere/getprodukterbykategori/?kategori=${valgtKategori}&lokation=${valgtLokation}`).then(
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
                temp += `<br>`
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.id}"><button class="makegold">Følg annonce</button></a>`
                temp += "</li>"
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            } else {
                temp = `<h3> Der er ingen annoncer i denne kategori</h3>`
                document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  }
  