require('./connection/connection')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const LessonRouter = require('./routes/LessonRouter')
const SquadRouter = require('./routes/SquadRouter')

const app = express();
app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

app.listen(3000, () => console.log("Server started at port 3000"))


app.use('/lessons',LessonRouter)
app.use('/squads',SquadRouter)