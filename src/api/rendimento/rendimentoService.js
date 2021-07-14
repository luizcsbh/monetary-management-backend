/**Importando Rendimento */
const Rendimento = require('./rendimento')

/**Importando  errorHandler*/
const errorHandler = require('../common/errorHandler')

/**Metodos dos verbos http para CRUD */
Rendimento.methods(['get', 'post', 'put', 'delete'])

/** Middleware Retorna o valor novo e valida os campos */
Rendimento.updateOptions({ new: true, runValidators: true})

/**Retorna a mensagens de erros dos métodos post e put */
Rendimento.after('post', errorHandler).after('put', errorHandler)

Rendimento.route('get', (req, res, next) => {
    Rendimento.find({}, (err, docs) => {
        if(!err){
            res.json(docs)
        } else {
            res.status(500).json({errors: [error]})
        }
    })
})

/**Rota que conta todos os Documentos inseridos no banco
 * de dados no MongoDB
 */
Rendimento.route('count',(req, res, next) => {
    Rendimento.countDocuments((error, value) => {
        if(error){
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

/**Rota que apresenta o sumario dos Rendimentos */
Rendimento.route('summary', (req, res, next) => {
    /**Função que recebe vários objetos*/
    Rendimento.aggregate([{ 
        $project: {credito: {$sum: "$credito.value"}, debito: {$sum: "$debito.value"}} 
    }, { 
        $group: {_id: null, credito: {$sum: "$credito"}, debito: {$sum: "$debito"}}
    }, { 
        $project: {_id: 0, credito: 1, debito: 1}
    }]), (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credito: 0, debito: 0})
        }
    }
})

module.exports = Rendimento
