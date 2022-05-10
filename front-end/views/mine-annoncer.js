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

  fetch(`http://localhost:1337/api/getAnnoncerOprettetAf/${bruger.id}`).then(
    res => {
      res.json().then(
        data => {
          console.log(data);
          if (data.length > 0) {
            let temp = "";
            data.forEach((annonce) => {
              temp += `<form ref='uploadForm' 
              id='uploadForm' 
              action='http://localhost:1337/api/brugere' 
              method='post' 
              accept='image/*'
              maxfilesize='10000000'
              encType="multipart/form-data">
              <label for="titel">Titel: </label>
        <br>
        <input type="text" name="titel" value="${annonce.titel}"/>
        <br>
        <label for="pris">Pris (i kr.): </label>
        <br>
        <input type="number" name="pris" value="${annonce.pris}"/>
        <br>
        <label for="beskrivelse">Beskrivelse: </label>
        <br>
        <input type="text" name="beskrivelse" value="${annonce.beskrivelse}"/>
        <br>
        <label for="kategori">Vælg en kategori:</label>
        <br>
        <select id="kategori" name="kategori" value="${annonce.kategori}" required>
          <optgroup label="Hjemmet">
            <option value="Møbler">Møbler</option>
            <option value="Boliger">Boliger</option>
          </optgroup>
          <optgroup label="Hobby">
            <option value="Livsstil">Livsstil</option>
            <option value="Sport">Sport</option>
          </optgroup>
          <optgroup label="Køretøjer">
            <option value="Cykler">Cykler</option>
            <option value="Motorcykler">Motorcykler</option>
            <option value="Biler">Biler</option>
          </optgroup>
          <optgroup label="Tøj">
            <option value="Jakker">Jakker</option>
            <option value="Bukser">Bukser</option>
            <option value="sko">Sko</option>
          </optgroup>
          <optgroup label="Diverse">
            <option value="Andet">Andet</option>
          </optgroup>
        </select>
        <br>
        <input id="id" type="hidden" value="${annonce.id}" name="id"/>
        <br>
        <a href=""><img src="./uploads/${annonce.billedeUrl}" alt="icon" width="300px" height="300px"></a>
        <br>
        <input type="file" name="billedeFil" />
        <br>
        <input id="submitknap" type='submit' value='Opdater annonce' />
        <br>
        <hr>
    </form>
    <form>
    <a href="http://localhost:1337/api/produkter/deleteprodukt/${annonce.id}"><button class="sletknap">Slet annoncen</button></a>
    </form>
  
    `
            });
            document.getElementById('tilføjItem').innerHTML = temp;
          } else {
            document.getElementById('tilføjItem').innerHTML = "<h3>Du har ingen annoncer oprettet</h3>";

          }
        }
      )
    }
  )
});