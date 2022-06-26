const express = require('express');
const mongoose = require('mongoose');
const mongoConnectionUri = "mongodb://localhost:27017/stock_market_db";
const routes = require('./routes/stocks');
const bodyParser = require('body-parser');

mongoose.connect(mongoConnectionUri, () =>{
    console.log("Connected to DB");
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log("DB connection error", error);
})

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ status: "I'm alive!" });
})

app.use('/healthcheck', require('express-healthcheck')({
    healthy: function () {
        return { everything: 'is ok' };
    }
}));

app.use(express.json()); 

app.use('/stocks', routes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server Started at ${3000}`)
})
  
   


