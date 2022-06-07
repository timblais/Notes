const express = require('express');
const app = express();

let notes = []

app.get('/', (request,response) => {
    response.send('/index.html')
})

app.get('/api/notes', (request,response) => {
    response.json(notes)
})

const PORT = 3000
app.listen(PORT, () => {
    console.log('Server running on port 3000')
})
