import { BASE_URL } from "../../../services/helper";


export const getProducts =()=>async(dispatch)=>{
    try {
        const datas = await fetch(`${BASE_URL}/getproducts`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const res = await datas.json();
        console.log(res);
        dispatch({type:"SUCCESS_GET_PRODUCTS", payload:res})
    } catch (error) {
        dispatch({type:"FAIL_GET_PRODUCTS", payload:error.response})
    }
}