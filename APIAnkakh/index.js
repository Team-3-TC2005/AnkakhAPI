// Npm module (express, mysql)
const express = require('express');
const app = express();

// Template engine
const exphbs = require('express-handlebars');


// Port
const PORT = 5500;

// Templating
app.engine("handlebars", exphbs({ defaultLayout : 'ankmain' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));


app.use('/ankakh', require('./Routes/ankakhapi/ankmember'));

app.use(express.static('public'));

// Root 
app.get('/', (request, response) =>
{
    response.render("ankindex");
    
});


app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
);