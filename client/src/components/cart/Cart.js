import React, { useContext, useEffect, useState } from 'react';
import "./cart.css";
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from '../../services/helper';
// import CircularProgress from '@mui/material';

const Cart = () => {


    const { id } = useParams("");
    ///// console.log(id);

    const history = useNavigate("")


    // eslint-disable-next-line
    const { account, setAccount } = useContext(LoginContext)

    const [inddata, setInddata] = useState("");

    // const [inddata, setInddata] = useState([]);             <<<<<<<<<<<<<<<<<<This is an Array
    console.log(inddata);



    useEffect(() => {
        const getinddata = async () => {
            const res = await fetch(`${BASE_URL}/getproductsone/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const datas = await res.json();
            //console.log(datas);

            if (res.status !== 201) {
                console.log("no data available");
            } else {
                console.log("getdata");
                setInddata(datas);

            }


            if (datas !== null && res.status === 201) {
                console.log("The data get finally...");
                setInddata(datas);
            } else {
                console.log("no data available");
            }
        };

        setTimeout(getinddata,1000)
    }, [id]);

        //    getinddata();
    //   }, [id]);

    // add cart function ============================================

    const addtocart = async (id) => {
        const checkres = await fetch(`${BASE_URL}/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inddata
            }),
            credentials: "include"
        });

        const data1 = await checkres.json();
        console.log(data1);

        if (checkres.status === 401 || !data1) {
            console.log("user invalid in CART");
            alert("data not added and INVALID")
        } else {
            // alert("data added in your CART");
            setAccount(data1)
            history("/buynow")
        }
    }

    // CHAT GPT NEW CODE MODIFIED ===========================
    // add cart function
    // const addtocart = async (id) => {
    //     const checkres = await fetch(`/addcart/${id}/${getCurrentUserId()}`, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             inddata
    //         }),
    //         credentials: "include"
    //     });

    //     const data1 = await checkres.json();
    //     console.log(data1 + "frontend data");

    //     if (checkres.status === 401 || !data1) {
    //         console.log("user invalid in CART");
    //         alert("data not added and INVALID")
    //     } else {
    //         alert("data added in your CART")
    //     }
    // }



    // CHAT GPT =========================
    // const addtocart = async (id) => {
    //     const userID = authenticate(req); // Replace this with code to get the currently logged-in user's ID
    //     const checkres = await fetch(`/addtocart/${id}/${userID}`, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             inddata
    //         }),
    //         credentials: "include"
    //     });

    //     const data1 = await checkres.json();
    //     console.log(data1 + "new data from CHATGPT...")

    //     if (checkres.status !== 201) {
    //         console.log("Error adding to cart ChatGPT");
    //     } else {
    //         console.log("Added to cart successfully ChatGPT");
    //     }
    // };


















    // const getinddata = async () => {
    //     const res = await fetch(`/getproductsone/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });

    //     const data = await res.json();
    //     console.log(data);
    // }





    // useEffect(() => {
    //     getinddata();
    // }, [id]);





    return (
        <div className='cart_section'>
            {inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={inddata.url} alt="cart_img" />
                        <div className="cart_btn">
                            <button className='cart_btn1' onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div>
                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : {inddata.price.mrp} </p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>{inddata.price.cost}</span> </p>
                        <p>You save :  <span style={{ color: "#B12704" }}>{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span> </p>
                        <div className="discount_box">
                            <h5>Discount : <span style={{ color: '#111' }}>{inddata.discount}</span></h5>
                            <h4>Free Delivery <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21</span>Details</h4>
                            <p>Fastest delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the item : <span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>}


            {!inddata ? <div className='circle'>
                <CircularProgress />
                <h2>Loading...</h2>
            </div>: "" }
        </div>
    )
}

export default Cart