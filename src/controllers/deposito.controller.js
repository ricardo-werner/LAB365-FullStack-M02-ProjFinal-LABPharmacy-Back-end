const { Deposito } = require('../models/deposito')

class DepositoController{
    async createOneDeposito(request, response){

        try {
            const {
                name,
                email,
                password
            } = request.body;
    
             const data = await Deposito.create({
                name,
                email,
                password
            })
    
            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar deposito",
                    cause: error.message
                }
            )
        }
    }
}
    
module.exports = new DepositoController()