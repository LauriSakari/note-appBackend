require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2020-01-10T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2020-01-10T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2020-01-10T19:20:14.298Z",
//       important: true
//     }
//   ]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    console.log('haetaan kaikki muistiinpanot')
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

  app.delete('/api/notes/:id', (request, response, next) => {
    console.log('deletoidaan ', request.params.id)
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })


  // UUSI APP.GET
  app.get('/api/notes/:id', (request, response, next) => {
    console.log('haetaan muistiinpanoa: ', request.params.id)
    Note.findById(request.params.id).then(note => {
      if (note) {
        response.json(note)
      }
      else  {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

// olemattomien osoitteiden käsittely
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

    // virheellisten pyyntöjen käsittely
    app.use(errorHandler)

  // VANHAA KOODIA ENNEN MONGODB KÄYTTÖÖNOTTOA
  // app.get('/api/notes/:id', (request, response) => {
  //   const id = Number(request.params.id)
  //   const note = notes.find(note => note.id === id)
  //   if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  // })

  // const generateId = () => {
  //   const maxId = notes.length > 0
  //     ? Math.max(...notes.map(n => n.id))
  //     : 0
  //   return maxId + 1
  // }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
      // VANHAA KOODIA ENNEN MONGODB KÄYTTÖÖNOTTOA
      // id: generateId(),
    })
    console.log(note)
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
    // VANHAA KOODIA ENNEN MONGODB KÄYTTÖÖNOTTOA
    // notes = notes.concat(note)
  
    // response.json(note)
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })