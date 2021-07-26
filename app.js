const express = require('express');
const cfg = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = cfg.get('port')||5000



app.use(express.json({extended:true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/transport', require('./routes/transport.routes'));

async function start() {
    try{
        console.log(cfg.get('jwtSecret'));
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
        await mongoose.connect(cfg.get('mongoUri'), {
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

