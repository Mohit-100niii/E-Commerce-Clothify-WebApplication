import expressAsyncHandler from "express-async-handler";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

//stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrderCtrl = expressAsyncHandler(async (req, res) => {
  //get the payload(customer,orderItems,shippingAddress,totalPrice);
  const { orderItems, shippingAddress, totalPrice } = req.body;

  //find the user
  const user = await User.findById(req.userAuthId);
  //check if user has shipping address
  if (!user?.hasShippingAddress) {
    throw new Error("Please Enter Shipping Address");
  }

  //check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No Order Items");
  }
  //place/create order
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  //update product quatity and quantity sold
  //finding the product_id in the orderitems array

  //yaha pehle hmne prderitmes m jin jin id product ide se match hoti h unko products array
  //m daal diya
  //then ab orderitems ko traverse kara
  //single order liya then products ko travserse kara jiski product id order id
  //se match hoti h
  //uss product ke totalsold ko bda diya

  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id.toString() === order?._id.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });

  //push the order into user
  user.orders.push(order?._id);
  await user.save();

  //make payment(stripe)
  //coverrt order items to have same struture that as of stripe name
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send({ url: session.url });

  //Payment Webhook-payment ke server connection loss ho jaara h na usko prevenet karne ke liye h ye

  //update user Order

  res.json({
    status: "success",
    mesaage: "Order Created Successfully",
    order,
  });
});
