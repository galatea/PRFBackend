const express = require('express')
const mongoose = require('mongoose')
const app = express()



require('./user.model');
const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://admin:zsolt123123@prfcluster.ariec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => {console.log('db csatlakoztatva')})
mongoose.connection.on('error', (err) => {console.log('db csatlakozási hiba', err)})

mongoose.model('aru', require('./mongoose_schemes/aru.schema'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/proba', (req, res) => {
    console.log(req.body.gyakvezer)
    console.log(req.body['ora'])
    res.status(200).send('OK')
})

app.use('/', require('./routes'))
app.use('/ezegymasikroute', require('./routes'))

app.listen(3000, () => {
    console.log('A szerver fut')
})