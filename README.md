## Project Title
**MatchMiles 🌍** – Find the best spot to meet up with friends based on everyone's location.

**Author** - Maryanne Amanze

## Project Description
MatchMiles is a web application that helps users find a central meeting location based on multiple inputted addresses or areas. The application allows users to enter data and returns hangout spot suggestions equidistant from each address entered. It’s perfect for groups of friends or colleagues trying to meet up. It also has a contact form to submit messages and contact details that will be added into my database.

## Target Browsers & Platforms
- Google Chrome (latest)
- Safari 
- Firefox 
- Edge 
- Bing

---

## Developer Manual
A guide for developers want to use or build on MatchMiles.

## Javascript Libraries used:
- Leaflet.js - https://leafletjs.com/index.html 
- Canvas Confetti - https://github.com/catdad/canvas-confetti 

## APIs used:
- Google Maps Geocoding API - https://developers.google.com/maps/
- Google Maps Places API - https://developers.google.com/maps/

## Endpoints
- GET /api/geocode?address=...
Converts an address into coordinates using the Google Maps Geocoding API.
Query parameter: address (string)
Response: { lat, lng }
- GET /api/places?lat=...&lng=...
Finds nearby places around the provided coordinates using Google Maps Places API.
Query parameters:
lat – latitude
lng – longitude
Response: List of nearby places (name, type, vicinity)
- POST /api/contact
Used to submit a message from the contact form. This sends data to the messages table in Supabase.
Response:
Adds a row in the MatchMiles database in Supabase.


## Notes
- When you accept for location to be used, it takes time to load your accurate location.






## Others:
- Deployment - Vercel
- Database - Supabase

### How to Install

1. **Clone the repository and have fun!**

   git clone https://github.com/your-username/INST377_Final-Project-MatchMiles.git
  
