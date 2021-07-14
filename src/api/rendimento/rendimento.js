/**Import restful module  */
const restful = require('node-restful')

/**Reference mongoose*/
const mongoose = restful.mongoose

/**Schema Crédito */
const creditoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true}
})

/**Schema Dédito */
const debitoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!']},
    category: { type: String, required: false, uppercase: true,
        enum: ['CASA', 'CARRO','ALIMENTAÇÃO','TRANSPORTE','EDUCAÇÃO','ENTRETENIMENTO','SAÚDE']},
    status: { type: String, required: false, uppercase: true,
        enum: ['PAGO','PENDENTE','AGENDADO'] }
})

/**Schema Rendimentos */
const rendimentoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    month: {type: Number, min: 1, max: 12, required: true },
    year: {type: Number, min:1970, max: 2100, required: true },
    credito: [creditoSchema],
    debito: [debitoSchema]
})

/**Export MODEL Rendimentos*/
const Rendimentos = restful.model('Rendimento',rendimentoSchema)
module.exports = Rendimentos 