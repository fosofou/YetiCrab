const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port')||5000



app.use(express.json({extended:true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/transport', require('./routes/transport.routes'));

async function start() {
    try{
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            
        });
        
     } catch(e){
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start()
