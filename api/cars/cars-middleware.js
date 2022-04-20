const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const car = await Cars.getById(req.params.id)
  if (!car) {
    res.status(404).json({message: "car with this id is not found"})
  }else {
    req.car = car
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body
  if (!vin) {
     res.status(400).json({ message: `vin is missing` })
  } else if (!make) {
     res.status(400).json({ message: `make is missing` })
  } else if (!model) {
     res.status(400).json({ message: `model is missing` })
  }else if (!mileage) {
     res.status(400).json({ message: `mileage is missing` })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.bodyconst 
  const isValidVin = vinValidator.validate(vin)
  if (!isValidVin) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body
  const cars = await Cars.getAll()
  const vinExists = cars.filter(car => car.vin === vin).length ? true : false
  if (vinExists) {
    res.status(400).json({ message: `vin ${vin} already exists` })
  } else {
    next()
  }
}


module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}