document.addEventListener("DOMContentLoaded", async (event) => {
  const bruger = JSON.stringify(localStorage.getItem("bruger"));
  let brugerTilId = JSON.parse(localStorage.getItem("bruger"))
  if (!brugerTilId) {
    location.href = "./login.html"
} else {
    let id = brugerTilId.id
    fetch(`http://localhost:1337/api/brugere/checkadmin/${id}`, {
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
    fetch(`http://localhost:1337/api/brugere/findAllBrugere`).then(
    res => {
      res.json().then(
        data => {
          if (data.length > 0) {
            let temp = "";
            data.forEach((bruger) => {
              temp += `<form ref='uploadForm' 
              id='uploadForm' 
              action='http://localhost:1337/api/brugere/updatebruger' 
              method='post' 
              <label> Bruger ID: ${bruger.id}</label>
              <br>
              <label> Bruger guld-status: ${bruger.is_Guldbruger}</label>
              <br>
              <label> Bruger admin-status: ${bruger.is_Admin}</label>
              <br>
              <label> Bruger oprettelsesdato: ${bruger.createdAt}</label>
              <br>
              <br>
              <label for="titel">Navn: </label>
        <br>
        <input type="text" name="navn" value="${bruger.navn}" required/>
        <br>
        <label for="email">Email: </label>
        <br>
        <input type="email" name="email" value="${bruger.email}" required/>
        <br>
        <label for="password">Password: </label>
        <br>
        <input type="text" name="password" value="${bruger.password}" required/>
        <br>
        <label for="telefon">Telefon: </label>
        <br>
        <input type="tel" name="telefon" value="${bruger.telefon}" pattern="[0-9]{8}"
        required/>
        <br>
        <label for="lokation">Lokation:</label>
        <br>
        <select id="lokation" name="lokation" value="${bruger.lokation}" required>
          <option value="1">Sjælland</option>
          <option value="2">Midtjylland</option>
          <option value="3">Nordjylland</option>
          <option value="4">Syddanmark</option>
          <option value="5">Bornholm</option>
        </select>
        <br>
        <input id="id" type="hidden" value="${bruger.id}" name="id"/>
        <br>
        <br>
        <input id="submitknap" type='submit' value='Opdater bruger' />
        <br>
        </form>
        <a href="http://localhost:1337/api/brugere/sletbruger/${bruger.id}">
        <button class="sletknap" type="button">Slet bruger</button></a>
        `
        if(bruger.is_Guldbruger) {
          temp += `<a href="./api/brugere/degradebruger/${bruger.id}">
          <button class="makenormal" type="button">Gør bruger til normal-bruger</button></a>`
        } else {
          temp += `<a href="./api/brugere/upgradebruger/${bruger.id}">
          <button class="makegold" type="button">Gør bruger til guld-bruger</button></a>`
        }

            });
            document.getElementById('tilføjItem').innerHTML = temp;
          } else {
            document.getElementById('tilføjItem').innerHTML = "<h3>Der er ingen brugere i databasen.</h3>";

          }
        }
      )
    }
  )
  });