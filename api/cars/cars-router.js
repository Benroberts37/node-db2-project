// DO YOUR MAGIC
const server = require('express')
const router = server.Router()

//import middleware
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

const Cars = require('./cars-model')

router.get('/', (req, res) => {
  Cars.getAll()
    .then(cars => {
      res.json(cars)
    })
})

router.get('/:id', checkCarId, (req, res) => {
  res.json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res) => {
  const newCarRec = await Cars.create(req.body)
  res.status(201).json(newCarRec)
})

router.delete('/:id', checkCarId, async (req, res) => {
  const deletedCar = await Cars.deleteById(req.params.id)
  res.json(deletedCar)
})

router.put('/:id', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, checkCarId, async (req, res) => {
  const newCarRec = await Cars.updateById(req.params.id, req.body)
  res.status(201).json(newCarRec)
})

module.exports = router