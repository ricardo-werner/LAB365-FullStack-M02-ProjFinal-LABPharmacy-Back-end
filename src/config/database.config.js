const { config } = require('dotenv')
config()

//console.log(process.env)

module.exports = {
    dialect: process.env.DIALECT, //Qual banco de dados está utilizando;
    host: process.env.HOST, //Qual servidor está utilizando;
    username: process.env.DB_USERNAME, //Qual o nome do seu usuário no postgres;
    password: process.env.DB_PASSWORD, //Qual a senha do seu usuário no postgres;
    database: process.env.DATABASE, //Qual o nome do seu database no postgres;
    port: process.env.PORT, //Qual porta do seu postgres (Normalmente é a 5432);
    secret_key: process.env.SECRET_KEY, //Chave secreta para gerar tokens;
    define: {
        underscored: true,
        underscoredAll: true,
    }
};