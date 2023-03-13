import React, { useEffect, useState } from 'react'

const Subtotal = (props) => {
  const { item } = props;

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const totalAmount = () => {
      let price = 0;
      item.forEach((item) => {
        price = item.price.cost + price;
      });
      setPrice(price);
    };
    totalAmount();
  }, [item]);

  return (
    <div className="sub_item">
      <h3>
        Subtotal ({item.length}):{" "}
        <strong style={{ fontWeight: 700, color: "#111" }}>₹{price}.00</strong>
      </h3>
    </div>
  );
};



///////////////////// Chat gpt generated

// const Subtotal = (props) => {
//   const { item } = props;

//   const [price,setPrice] = useState(0);

//   useEffect(()=>{
//     totalAmount();
//   },[item])

//   const totalAmount = ()=>{
//     let price = 0;
//     item.map((item)=>{
//       price = item.price.cost + price
//     });
//     setPrice(price)
//   }


//   return (
//     <div className='sub_item'>
//         <h3>Subtotal ({item.length}): <strong style={{fontWeight:700,color:"#111"}}>₹{price}.00</strong></h3>
//     </div>
//   )
// }










// const Subtotal = () => {


//   const [price,setPrice] = useState(0);

//   useEffect(()=>{
//     totalAmount();
//   },[item])

//   const totalAmount = ()=>{
//     let price = 0;
//     item.map((item)=>{
//       price = item.price.cost + price
//     });
//     setPrice(price)
//   }


//   return (
//     <div className='sub_item'>
//         <h3>Subtotal ({item.length}): <strong style={{fontWeight:700,color:"#111"}}>₹{price}.00</strong></h3>
//     </div>
//   )
// }

export default Subtotal