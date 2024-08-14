import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Calculate total price and quantity
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + (curr.price * curr.qty), // Ensure price is multiplied by quantity
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + curr.qty, // Ensure quantity is summed correctly
    0
  );

  // Load Stripe
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handlePayment = async () => {
    if (!user.email) {
      toast("You have not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
  
    const stripe = await stripePromise;
  
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productCartItem),
      });
  
      if (res.ok) {
        const { sessionId } = await res.json();
  
        if (sessionId) {
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.error("Stripe checkout error:", error);
            toast("Payment failed. Please try again.");
          }
        } else {
          console.error("Invalid sessionId:", sessionId);
          toast("Failed to create checkout session.");
        }
      } else {
        console.error("Failed to create checkout session:", res.statusText);
        toast("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      toast("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">Your Cart Items</h2>
        {productCartItem.length > 0 ? (
          <div className="my-4 flex gap-3">
            {/* Display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.price * el.qty} // Ensure total is price * quantity
                  price={el.price}
                />
              ))}
            </div>
            {/* Total cart item */}
            <div className="w-full max-w-md ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
                Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm" alt="Empty Cart" />
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
