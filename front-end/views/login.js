document.addEventListener("DOMContentLoaded", async (e) => {
    document.getElementById("form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      const bruger = {
        email: email,
        password: password,
      };
  
  
      await fetch("http://localhost:1337/api/brugere/brugerLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bruger),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            localStorage.setItem("bruger", JSON.stringify(response));
            location.href = "/index.html";
          } else {
            window.alert("Login oplysninger forkert");
          }
        })
        .catch(() => {
          window.alert("Der skete en fejl ved login");
        });
    });
  });
  