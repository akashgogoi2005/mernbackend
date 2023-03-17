import React, { useEffect, useState } from 'react'
import { Divider } from "@mui/material"
import Option from './Option'
import Subtotal from './Subtotal'
import Right from './Right'
import "./buynow.css"
import { BASE_URL } from '../../services/helper'

const getdatabuy = async (setCartdata) => {
  const res = await fetch(`${BASE_URL}/cartdetails`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    // credentials: "include"
  });

  const data = await res.json();

  if (res.status !== 201) {
    console.log("error");
  } else {
    setCartdata(data.carts);
  }
};

const Buynow = () => {
  const [cartData, setCartdata] = useState("");

  useEffect(() => {
    getdatabuy(setCartdata);
  },[]);

  return (
    <>
      {
        cartData.length ? (
          <div className='buynow_section'>
            <div className="buynow_container">
              <div className="left_buy">
                <h1>Shopping Cart</h1>
                <p>Select all items</p>
                <span className="leftbuyprice">Price</span>
                <Divider />
                {
                  cartData.map((e, k) => {
                    return (
                      <>
                        <div className="item_containert">
                          <img src={e.detailUrl} alt="" />
                          <div className="item_details">
                            <h3>{e.title.longTitle}</h3>
                            <h3>{e.title.shortTitle}</h3>
                            <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
                            <p className="unusuall">Usually dispatched in 8 days.</p>
                            <p>Eligible for FREE Shipping</p>
                            <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                            <Option deletedata={e.id} get={getdatabuy.bind(null, setCartdata)} />
                          </div>
                          <h3 className="item_price">₹{e.price.cost}.00</h3>
                        </div>
                        <Divider />
                      </>
                    )
                  })
                }
                <Subtotal item={cartData} />
              </div>
              <Right item={cartData} />
            </div>
          </div>
        ) : ""
      }
    </>
  )
};

export default Buynow;











// import React, { useEffect, useState } from 'react'
// import { Divider } from "@mui/material"
// import Option from './Option'
// import Subtotal from './Subtotal'
// import Right from './Right'
// import "./buynow.css"


// const Buynow = () => {

//   const [cartData, setCartdata] = useState("");
//   // console.log(cartData.carts);

//   useEffect(() => {
//     const getdatabuy = async () => {
//       const res = await fetch("/cartdetails", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         credentials: "include"
//       });

//       const data = await res.json();

//       if (res.status !== 201) {
//         console.log("error");
//       } else {
//         setCartdata(data.carts);
//       }
//     };

//     getdatabuy();
//   },[]);



//   return (
//     <>{
//       cartData.length ? <div className='buynow_section'>
//         <div className="buynow_container">
//           <div className="left_buy">
//             <h1>Shopping Cart</h1>
//             <p>Select all items</p>
//             <span className="leftbuyprice">Price</span>
//             <Divider />
//             {
//               cartData.map((e, k) => {
//                 return (
//                   <>
//                     <div className="item_containert">
//                       <img src={e.detailUrl} alt="" />
//                       <div className="item_details">
//                         <h3>{e.title.longTitle}</h3>
//                         <h3>{e.title.shortTitle}</h3>
//                         <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
//                         <p className="unusuall">Usually dispatched in 8 days.</p>
//                         <p>Eligible for FREE Shipping</p>
//                         <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
//                         <Option deletedata={e.id} get={getdatabuy} />
//                       </div>
//                       <h3 className="item_price">₹{e.price.cost}.00</h3>
//                     </div>
//                     <Divider />
//                   </>
//                 )
//               })
//             }

//             <Subtotal item={cartData} />
//           </div>
//           <Right item={cartData} />
//         </div>
//       </div> : ""
//     }
//     </>
//   )
// };

// export default Buynow





/////////////// This is error for Array in useEffect

  // const getdatabuy = async () => {
  //   const res = await fetch("/cartdetails", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     credentials: "include"
  //   });

  //   const data = await res.json();

  //   if (res.status !== 201) {
  //     console.log("error");
  //   } else {
  //     setCartdata(data.carts);
  //   }
  // };

  // useEffect(() => {
  //   getdatabuy();
  // },[]);