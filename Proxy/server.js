require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());
app.use('/:id', express.static(path.join(__dirname, './public')));

  const chartReq = axios.create({
    baseURL: 'http://localhost:8080/'
  });
  
  app.get('/api/:stockId', (req, res) => {
    chartReq.get(`api/${req.params.stockId}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  })

app.listen(port, () => {
    console.log('Server is listening on port', port);
});

