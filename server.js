const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Mongo db connected'))
  .catch(err => console.error('Unable to connect MongoDB', err));

app.get('/', (req, res) => {
  res.send('API LINK');
});

app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/users', require('./routes/users.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
