const app = require('express') ()
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 3300

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
    res.send('This is a USSD Application test')
})

app.post('*', (req,res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if(text === '') {
        // This is the first request.
        let response = `CON What would you want to check /n
        1. My Account
        2. phone number`

        res.send(response)
    } else if (text === 1) {
        let response = `CON Choose account information you want to view
        1. Account Number
        2. Account balance`

        res.send(response)
        
    } else if (text === '2') {
        // Business logic for first level response
        let response = `END Your phone number is ${phoneNumber}`
        res.send(response)
    } else if (text === '1*1') {
        let accountNumber = 'ACC1001'
        let response = `END Your account number is ${accountNumber}`
        res.send(response)
    } else if (text === '1*2') {
        // This is the second level response where the user selected 1 in the first instance
        let balance = 'GHS 1,000,000'
        let response = `END Your balance is ${balance}`
        res.send(response)
    } else{
        res.status(400).send('Bad request!')
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})