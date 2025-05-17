function createMap() {
    var map = L.map('map');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
    
            map.setView([lat, lng], 15);
            L.marker([lat, lng])
              .addTo(map)
              .bindPopup("You are here!")
              .openPopup();
          },
          () => {
            alert("Could not get your location!");
          }
        );
      }
}

function populateDatabase() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  
  sprinkleConfetti();

  // confetti not fully sprinkling before page reload
  setTimeout(() => {
    window.location.reload();
  }, 15000);
}

function sprinkleConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.8 }
  });
}

async function getCoordinates(address) {
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
    const data = await res.json();

    if (data.status === "OK") {
        return data.results[0].geometry.location;
    } else {
      alert("Error getting coordinates");
    }
}

function getMidpoint(coords) {
    const lat = (coords[0].lat + coords[1].lat + coords[2].lat) / 3;
    const lng = (coords[0].lng + coords[1].lng + coords[2].lng) / 3;
    return { lat, lng };
}

async function getNearbyPlaces(midpoint) {
    const res = await fetch(`/api/places?lat=${midpoint.lat}&lng=${midpoint.lng}`);
    const data = await res.json();

    if (data.status === "OK") {
        return data.results;
    } else {
        console.log("Error getting nearby places");
    }
}

function displayPlaces(places) {
    const container = document.getElementById("suggested-box");
    container.innerHTML = "";

    if (places.length === 0) {
        container.textContent = "No spots found nearby.";
        return;
    }

    places.forEach(place => {
        const div = document.createElement("div");
        div.classList.add("place-item");

        div.innerHTML =
        `${place.name}<br>
        <em>Address:</em> ${place.vicinity}
        `;
        container.appendChild(div);
    });
}

async function handleFindHangout() {
        const loc1 = document.getElementById("location-1").value;
        const loc2 = document.getElementById("location-2").value;
        const loc3 = document.getElementById("location-3").value;

        const coords = await Promise.all([
            getCoordinates(loc1),
            getCoordinates(loc2),
            getCoordinates(loc3)
        ]);

        const midpoint = getMidpoint(coords);
        const nearbyPlaces = await getNearbyPlaces(midpoint);
        //console.log(nearbyPlaces);
        displayPlaces(nearbyPlaces);

        document.getElementById("suggested-area").style.display = "block";

}
//document.querySelector("button").addEventListener("click", handleFindHangout);
