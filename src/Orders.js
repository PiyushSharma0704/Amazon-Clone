import { addDoc, collection, onSnapshot, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from "./firebase"
import Order from './Order';
import './Orders.css'
import { useStateValue } from './StateProvider';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user) {  
      addDoc(collection(db, "users"), collection('orders'), orderBy('created', 'desc'))
        onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })))
        ))
      } else {
      setOrders([]) 
    }
     
  }, [user])

  return (
    <div className='orders'>
      <h1>Your Order list is here:</h1>
      <div className='orders__order'>
        {orders.map(order => (
          <Order order={order} />
        ))}

      </div>
    </div>
  )
}

export default Orders