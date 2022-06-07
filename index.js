const express = require('express');
const app = express();

app.use(express.json())

let notes = [
    {
        id: 1,
        content: 'note content 1',
        important: true,
    },
    {
        id: 2,
        content: 'note content 2',
        important: false,
    },
    {
        id: 3,
        content: 'note content 3',
        important: true,
    }
]

app.get('/', (request,response) => {
    response.send('/index.html')
})

app.get('/api/notes', (request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note){
        response.json(note)
    } else {
        response.status(404).end()
    }
  })

const PORT = 3000
app.listen(PORT, () => {
    console.log('Server running on port 3000')
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })