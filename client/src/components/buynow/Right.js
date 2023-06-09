import { React, useState, useEffect } from 'react'

const Right = ({ item }) => {

  const [price, setPrice] = useState(0);



  useEffect(() => {
    const totalAmount = () => {
      let price = 0;
      item.map((item) => {
        price = item.price.cost + price;
        return null;
      });
      setPrice(price);
    };

    totalAmount();
  }, [item]);








  // useEffect(()=>{
  //   totalAmount();
  // },[item])



  // const totalAmount = ()=>{
  //   let price = 0;
  //   item.map((item)=>{
  //     price = item.price.cost + price;
  //     return null;
  //   });
  //   setPrice(price);
  // }



  // const totalAmount = ()=>{
  //   let price = 0;
  //   item.map((item)=>{
  //     price = item.price.cost + price
  //   });
  //   setPrice(price)
  // }

  return (
    <div className='right_buy'>
      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
      <div className="cost_right">
        <p>Your order is eligible for FREE Delivery.<br />
        <span style={{ color: "#565959" }}>Select this option at checkout. Details</span></p>
        <h3>Subtotal ({item.length}): <span style={{ fontWeight: 700 }}>₹{price}.00</span></h3>
        <button className="rightbuy_btn">Proceed to Buy</button>
        <div className="emi">
          EMI Available
        </div>
      </div>
    </div>
  )
}

export default Right