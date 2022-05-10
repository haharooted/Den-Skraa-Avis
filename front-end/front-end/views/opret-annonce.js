document.addEventListener("DOMContentLoaded", (e) => {
  let brugerTilId = JSON.parse(localStorage.getItem("bruger"));
  if (!brugerTilId) {
    location.href = "./login.html";
  } else {
    let id = brugerTilId.id;
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
          location.href = "./login.html";
        }
      })
      .catch(() => {
        location.href = "./login.html";
      });
  }
  const bruger = JSON.parse(localStorage.getItem("bruger"));
  document.getElementById("oprettetAfId").value = bruger.id;
});
