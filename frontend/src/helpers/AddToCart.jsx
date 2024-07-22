import { toast } from "react-toastify";
import summaryApi from "../common";

async function addToCart(e, id) {
   e?.stopPropagation();
   e?.preventDefault();

   const fetchResponse = await fetch(summaryApi.addToCart.url, {
    method: summaryApi.addToCart.method,
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        productId: id
    })
   });

   const data = await fetchResponse.json();
   if(data.success) {
     toast.success(data?.message);
   }
   if(data.error) {
    toast.error(data?.message);
   }

   return data;
}

export default addToCart;