const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Permite requisições de outras origens
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// ✅ ROTA DE VERIFICAÇÃO DE SAÚDE ADICIONADA AQUI
// Esta rota serve para o UptimeRobot "pingar" a API e mantê-la sempre ativa.
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'TACO API is healthy and awake!' });
});

// Configura o endpoint principal da API GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Inicia o servidor
app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
