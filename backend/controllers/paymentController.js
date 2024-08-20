const stripe = require("../config/stripe");
const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");
const User = require("../models/userModel");
const cart = require("../models/cardProduct");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

const paymentController = expressAsyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  const user = await User.findOne({ _id: req.userId });
  const params = {
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate: "shr_1PoS2dSCEXfYExAIkduwxg4f",
      },
    ],
    customer_email: user.email,
    metadata: {
       userId: req.userId
    },
    line_items: cartItems.map((item, index) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.productName,
            images: item.productId.productImage,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount: item.productId.sellingPrice * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    }),
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  };

  const session = await stripe.checkout.sessions.create(params);
  res.status(303).json(session);
});

const getLineItems = async (lineItems) => {
    let productItems = [];
    if(lineItems?.data?.length) {
        for(const item of lineItems.data) {
           const product = await stripe.products.retrieve(item.price.product);
           const productId = product.metadata.productId;

           const productData = {
             productId: productId,
             name: product.name,
             price: item.price.unit_amount/100,
             quantity: item.quantity,
             image: product.images
           }

           productItems.push(productData);
        }
    }

    return productItems;
}

const webhook = expressAsyncHandler(async (req, res) => {
  const payloadString = JSON.stringify(req.body);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status
        },
        shipping_options: session.shipping_options.map(s => {
            return {
                ...s,
                shipping_amount: s.shipping_amount / 100
            }
        }),
        totalAmount: session.amount_total/100
      }
      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      if(saveOrder?._id) {
        const deleteCart = await cart.deleteMany({userId: session.metadata.userId})
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
});

module.exports = {paymentController, webhook};
