import express from 'express'
import car from './car/car.router'
import insurance from './insurance/insurance.router'
import maintenance from './maintenance/maintenance.router'
import payment from './payment/payment.router'
import booking from './booking/booking.router'
import location from './location/location.router'
import reservation from './reservation/reservation.router'
import { customer } from './customer/customer.router'
import authentication from './auth/auth.router'
import joins from './joins/joins.router'

const app = express()
//Middleware
app.use(express.json())



//Routes
car(app)
insurance(app)
maintenance(app)
location(app)
payment(app)
booking(app)
reservation(app)
customer(app)
authentication(app)
joins(app)


app.get('/', (req, res) => {
    res.send('Hello world')
})


app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081')
})