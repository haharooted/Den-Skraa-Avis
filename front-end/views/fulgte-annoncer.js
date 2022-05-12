document.addEventListener("DOMContentLoaded", async (event) => {
  let brugerTilId = JSON.parse(localStorage.getItem("bruger"))
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
fetch(`http://localhost:1337/api/produkter/followedProdukt/${brugerTilId.id}`).then(
res => {
  res.json().then(
    data => {
      let temp = "";
      if (data.length > 0) {
        data.forEach((annonce) => {
          temp += "<li>Titel: " + annonce.titel
          temp += "<br>Pris: " + annonce.pris + " kr."
          temp += "<br>Oprettelsesdato: " + annonce.createdAt
          temp += "<br>Beskrivelse: " + annonce.beskrivelse
          temp += '<br><a href=""><img src="./uploads/' + annonce.billedeUrl + '" alt="icon" width="300px" height="300px" class=""/></a>'
          temp += "</li>"
          temp += `<a href="http://localhost:1337/api/produkter/unfollowprodukt?brugerId=${brugerTilId.id}&produktId=${annonce.id}"><button class="makenormal">Følg ikke længere annonce</button></a>`
        })}
        else {
          temp += "<h3>Du har ingen fulgte varer!</h3>"
        }
        document.getElementById('tilføjItem').innerHTML = temp;
      })})});
        