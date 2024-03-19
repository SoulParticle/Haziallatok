document.addEventListener("DOMContentLoaded", () => {
    const ownersListDiv = document.getElementById("ownersList");
  
    window.togglePets = async (ownerId) => {
      if (ownerId === undefined) {
        console.error('Owner ID is undefined.');
        return;
      }
  
      const petsList = document.getElementById(`pets${ownerId}`);
      if (petsList.style.display === "none") {
        try {
          const response = await fetch(`http://localhost:3000/haziallatok?GazdaId=${ownerId}`);
          const pets = await response.json();
          petsList.innerHTML = `
            <thead>
              <tr>
                <th>Név</th>
                <th>Faj</th>
                <th>Kor</th>
              </tr>
            </thead>
            <tbody>
              ${pets.map(pet => `
                <tr>
                  <td>${pet.Név}</td>
                  <td>${pet.Faj}</td>
                  <td>${pet.Kor} éves</td>
                </tr>
              `).join('')}
            </tbody>
          `;
          petsList.style.display = "block";
        } catch (error) {
          console.error('Error fetching pets:', error);
        }
      } else {
        petsList.style.display = "none";
      }
    };
  

    fetch('http://localhost:3000/gazda')
      .then(response => response.json())
      .then(owners => {
        owners.forEach((owner, index) => {
          owner.id = index + 1;
          const ownerDiv = document.createElement("div");
          ownerDiv.innerHTML = `
            <h2>${owner.Nev}</h2>
            <button onclick="togglePets(${owner.id})">Háziállatok mutatása</button>
            <table id="pets${owner.id}" style="display: none;"></table>
          `;
          ownersListDiv.appendChild(ownerDiv);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });

  