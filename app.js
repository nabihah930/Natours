const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
// Each resource has a tiny sub-app that handles those resource requests
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Declare the middleware (a func. that can modify incoming request data) stack
app.use(express.json());                                    // Express's own middleware -> Data from the body is added to the req obj.
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

// app.get('/', (req, res) => {
//     // res.status(200).send('Route Handler for / endpoint');
//     res.status(200).json({ message: 'Handler for / endpoint', app: 'Natours' });
// });

// app.get('/api/v1/tours', getAllTours);
// Since we've specified the variable in the route we must provide it in the url
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// We will use these routers like middleware


// Mount each of these routers on the tour & user routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(3000, () => {
    console.log('App running on port 3000...');
});