const notesRouter = require('express').Router()
const Note = require('../models/note')
const logger = require('../utils/logger')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes.map(note => note.toJSON()))
})

notesRouter.delete('/:id', (request, response, next) => {
  logger.info('Deletoidaan ', request.params.id)
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.get('/:id', (request, response, next) => {
  logger.info('Haetaan muistiinpanoa: ', request.params.id)
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

notesRouter.put('/:id', (request, response, next) => {
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

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  const savedNote = await note.save()
  response.json(savedNote.toJSON())
})

module.exports = notesRouter