const express = require('express')
const app = express()
const path = require('path')

app.use(require('morgan')('dev'))

app.use(express.static(path.join(__dirname,'..','public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./api'))

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'..','index.html'))
})

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})