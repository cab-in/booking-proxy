const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use('/rooms/:listingid', express.static(path.resolve(__dirname, '../')));
app.use(bodyParser());

app.get('/api/:listingid/images', (req, res) => {
  axios.get(`http://54.215.150.88/api/${req.params.listingid}/images`)
    .then(({data}) => {
      res.send(data);
    });
});

app.get('/api/:listingid/reviews', (req, res) => {
  axios.get(`http://13.57.195.146/api/${req.params.listingid}/reviews`)
    .then(({data}) => {
      res.send(data);
    });
});

app.get('/api/:listingid/booking', (req, res) => {
  axios.get(`http://13.52.61.34/api/${req.params.listingid}/booking`)
    .then(({data}) => {
    res.send(data);
  });
});

app.get('/listing/amenity/:listingid', (req, res) => {
  axios.get(`http://18.221.218.103/listing/amenity/${req.params.listingid}`)
    .then(({data}) => {
    res.send(data);
  });
});

app.get('/listing/desc/:listingid', (req, res) => {
  axios.get(`http://18.221.218.103/listing/desc/${req.params.listingid}`)
    .then(({data}) => {
    res.send(data);
  });
});

app.get('/rooms/:listingid/:item.png', (req, res) => {
  res.redirect(`https://bedroost-booking-static.s3-us-west-1.amazonaws.com/images/${req.params.item}.png`)
});

// listings crud api -------------------------------------------------------------------------------------------

app.get('/api/rooms/:listingid', (req, res) => {
  axios.get(`http://18.217.116.36:3001/api/rooms/${req.params.listingid}`)
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

app.post('/api/rooms', (req, res) => {
  const { listing_id, baseprice, views, cleaningfee, servicefee, taxes, maxguests, lastavailabledate } = req.body;
  axios.post(`http://18.217.116.36:3001/api/rooms`, {
    listing_id,
    baseprice,
    views,
    cleaningfee,
    servicefee,
    taxes,
    maxguests,
    lastavailabledate,
  })
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

app.put('/api/rooms/:listingid', (req, res) => {
  const {
    baseprice, views, cleaningfee, servicefee, taxes, maxguests, lastavailabledate,
  } = req.body;
  const { listingid } = req.params;
  axios.put(`http://18.217.116.36:3001/api/rooms/${listingid}`, {
    baseprice,
    views,
    cleaningfee,
    servicefee,
    taxes,
    maxguests,
    lastavailabledate,
  })
  .then(({data}) => {
      res.send(data);
    })
  .catch(({err}) => {
      res.send(err);
  });
});

app.delete('/api/rooms/:listingid', (req, res) => {
  const { listingid } = req.params;
  axios.delete(`http://18.217.116.36:3001/api/rooms/${listingid}`)
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

// bookings crud api -------------------------------------------------------------------------------------------

app.get('/api/bookings/:listing_id', (req, res) => {
  axios.get(`http://18.217.116.36:3001/api/bookings/${req.params.listing_id}`)
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

app.post('/api/bookings/:listing_id', (req, res) => {
  const {
    booking_id, user_id, day,
  } = req.body;
  const { listing_id } = req.params;

  axios.post(`http://18.217.116.36:3001/api/bookings/${listing_id}`, {
    booking_id,
    user_id,
    day
  })
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

app.put('/api/bookings/', (req, res) => {
  const {
    listing_id, user_id, day,
  } = req.body;
  const { id } = req.query;

  axios.put(`http://18.217.116.36:3001/api/bookings/?id=${id}`, {
    listing_id,
    user_id,
    day
  })
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

app.delete('/api/bookings/', (req, res) => {
  const { id } = req.query;
  axios.delete(`http://18.217.116.36:3001/api/bookings/?id=${id}`)
    .then(({data}) => {
      res.send(data);
    })
    .catch(({err}) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`)
});
