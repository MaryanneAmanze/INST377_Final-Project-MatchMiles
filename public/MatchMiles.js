function createMap() {
    var map = L.map('map').setView([0, 0], 13);

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

document.getElementById("sendButton").addEventListener("click", sprinkleConfetti);

function sprinkleConfetti(event)
{
    //document.getElementById("sendButton").addEventListener("click", function () {
        // Optional: Do your send logic here

        event.preventDefault(); //the confetti keeps loading for a short period of time
    
        // Confetti burst
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.8 }
        });
    //  });
}


