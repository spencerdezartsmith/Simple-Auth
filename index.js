const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

const port = process.env.PORT || 3090

app.listen(port, () => console.log(`Gday maaaate... I can hear port ${port}`))
