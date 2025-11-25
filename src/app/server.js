const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./db');

app.use(express.json());
app.use(cors({origin:true,credentials:true}));

app.get('/get/clientes',async(req,res)=>{
    try {
        const [clientes] = await db.query('SELECT * FROM cliente');
        return res.status(201).send(clientes);
    } catch (error) {
        console.error('Vish',error);
        return res.status(500).send('Erro interno do servidor ao buscar cliente.')
    }
});


app.listen(port,()=>{
    console.log(`Rodando na porta ${port}`);
});