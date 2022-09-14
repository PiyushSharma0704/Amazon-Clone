import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';



function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const [error, setError] = useState(null); 
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // stripe code that allows to charge customers

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //Stripe expects the total in currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)

    }
    getClientSecret();
  }, [basket])

  console.log('The Secret is >>>>>', clientSecret)
  console.log('👱', user)

  const handleSubmit = async (event) => {
    //Stipe Codes
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // paymentIntent = paymentConfirmation

    {  db
      .collection('users')
      .doc(user.uid)
      .collection('orders') 
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })
    }
      setSucceeded(true);
      setError(null)
      setProcessing(false)

      dispatch({
        type: 'EMPTY_BASKET'
      })

      navigate(`/orders`) 

    })  
  
  }

  const handleChange  = event => {
    //Listen for changes in card element
    //Display any error as user enter card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");

  }

  return (
    <div className='payment'>
        <div className='payment__container'>
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>

            {/*Payment Section: Delivery address */}
            <div className='payment__section'>
              <div className='payment__title'>
                <h3>Delivery Address</h3>
              </div>
                <div className='payment__address'>
                  <p>Hello {!user ? 'Guest' : user.email}</p>
                  <p>123 React Villa</p>
                  <p>Gurgaon, Haryana</p>

                </div>
              </div>

            {/* Paymet Section: Reveiw items{ */}
            <div className='payment__section'>
              <div className='payment__title'>
                <h3>Review Items and Delivery</h3>
              </div>
              <div className='payment__items'>
                {basket.map(item => (
                  <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                ))}
              </div>
            </div>

            {/* Payment Section: Payment Method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                  <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />

                    <div className='payent__priceContainer'>
                      < CurrencyFormat
                          renderText={(value) => (
                              <h3>Order Total: {value}</h3>
                            )}
                          decimalScale={2}
                          value={getBasketTotal(basket)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                      />
                      <button disabled= {processing || disabled || succeeded}>
                            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                      </button>
                            

                    </div>
                    {/* Error Message */}
                    {error && <div>{error}</div>}
                  </form>
                </div>
            </div>
        </div>    
    </div>
  )
}


export default Payment