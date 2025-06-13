const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log(req.headers)
  res.send('<html><body><p>Hola</p></body></html>')
})

app.get('/fecha', (req, res) => {
    res.send(new Date())
})

function suma(req, res){
    res.send('1000')
}
sum2 = (req, res) => res.json({'valor':'2000'})
app.get('/suma', suma)
app.get('/sum2', sum2)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})