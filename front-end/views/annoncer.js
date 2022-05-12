document.addEventListener("DOMContentLoaded", async (event) => {
  const bruger = JSON.stringify(localStorage.getItem("bruger"));
  let brugerTilId = JSON.parse(localStorage.getItem("bruger"))
  event.preventDefault();

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
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.produkt_id}"><button class="makegold">Følg annonce</button></a>`
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
       let brugerTilId = JSON.parse(localStorage.getItem("bruger"))

      fetch(`http://localhost:1337/api/produkter/getprodukterbykategori/${valgtKategori}/${valgtLokation}`).then(
      res => {
        res.json().then(
          data => {
            if (data.length > 0) {
              var temp = "";
              data.forEach((annonce) => {
                temp += "<li>Titel: " + annonce.titel
                temp += "<br>Pris: " + annonce.pris + " kr."
                temp += "<br>Oprettelsesdato: " + annonce.createdAt
                temp += "<br>Annonce sidst redigeret: " + annonce.updatedAt
                temp += "<br>Beskrivelse: " + annonce.beskrivelse
                temp += "<br>Kategori: " + annonce.kategori
                temp += '<br><a href=""><img src="./uploads/' + annonce.billedeUrl + '" alt="icon" width="300px" height="300px" class=""/></a>'
                temp += `<br>`
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.id}"><button class="makegold">Følg annonce</button></a>`
                temp += "</li>"
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            } else {
                temp = `<h3> Der er ingen annoncer i denne søgning</h3>`
                document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  }
  

  function sortPris() {
    fetch(`http://localhost:1337/api/produkter/getprodukterallsortpris`).then(
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
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.produkt_id}"><button class="makegold">Følg annonce</button></a>`
                temp += "</li>"
                
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  }
  function sortEditDate() {
    fetch(`http://localhost:1337/api/produkter/getprodukterallsortEditDate`).then(
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
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.produkt_id}"><button class="makegold">Følg annonce</button></a>`
                temp += "</li>"
                
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  }
  function sortDate() {
    fetch(`http://localhost:1337/api/produkter/getprodukterallsortdate`).then(
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
                temp += `<a href="http://localhost:1337/api/produkter/followprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.produkt_id}"><button class="makegold">Følg annonce</button></a>`
                temp += "</li>"
                
              });
              document.getElementById('tilføjItem').innerHTML = temp;
            }
          }
        )
      }
    )
  }