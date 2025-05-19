const supabaseClient = require('@supabase/supabase-js');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static((__dirname + '/public')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/', (req, res) => {
    res.sendFile('public/MatchMiles_HomePage.html', {root:__dirname});
   
});

app.post ('/api/contact', async (req, res) =>{
    const{name, email, message} = req.body;

    const {data, error} = await supabase
    .from('contact_details')
    .insert([{customer_name: name, email_address: email, message_sent: message}]);

    if(error) {
        console.log('Error')
        res.statusCode = 500;
        res.send(error);
    }
});

app.get ('/api/geocode', async (req, res) => {
    const address = req.query.address; // take address from input
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    res.json(data);

});

app.get('/api/places', async (req, res) => {

    const { lat, lng } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=cafe|park|bar|restaurant|shopping_mall&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    const error = data.status !== 'OK' ? data.error_message || 'Failed' : null;
  
    if (error) {
      console.log('Error');
      res.statusCode = 500;
      res.send(error);
    } else {
      res.status(200).json(data);
    }
});
  
app.listen(port, () => {
    console.log(`Express app listening on port:${port}`);
    console.log(`Server running on http://localhost:${port}`);
});
