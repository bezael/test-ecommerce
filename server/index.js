// This is your test secret API key.
const stripe = require('stripe')('sk_test_FFy7VeYQS3mbHjq0zriKKidX');
const express = require('express');
const bodyparser = require("body-parser");
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyparser.json());

const YOUR_DOMAIN = 'http://localhost:4242';
const YOUR_DOMAIN_FRONT = 'http://localhost:1780';


app.post('/checkout', async (req, res) => {

  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.customer_email,
    line_items: [...items],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN_FRONT}/checkout`,
  });
  console.log('session', session);
  res.status(200).json(session);
  // res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));