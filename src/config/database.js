/* Import mongoose module */
const mongoose = require('mongoose')

/**Atribuição da api de Promise do Node para o mongoose para resolver WARNS no console */
mongoose.Promise = global.Promise

mongoose.set('useFindAndModify', false);

/**Criando variavel de ambiente com string de conexão com o banco */
//const url = process.env.MONGODB_URI ? process.env.MONGODB_URI:'mongodb+srv://appmongodb:adminapp@cluster0-khuil.mongodb.net/monetary-management?retryWrites=true'

/**Export the database local connection to monetary-management*/
module.exports = mongoose.connect('mongodb://localhost:27017/monetary-management', { useNewUrlParser: true, useUnifiedTopology: true})

/**Export the database cloud connection to rendimentos*/
//module.exports = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

/**Tratamento de mensagens de Erros */
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."