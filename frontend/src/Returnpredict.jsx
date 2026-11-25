import {useActionState, useEffect} from 'react'     
import Returnpercentage from './Returnpercentage';
function Returnpredict(){
    async function predict(_, formData){
        const starttime = Date.now();
        const data = Object.fromEntries(formData);
        data.fragile_item = formData.has("fragile_item")
        data.warranty_available = formData.has("warranty_available")
        data.delayed_delivery = formData.has("delayed_delivery")
        data.wishlist_before_purchase = formData.has("wishlist_before_purchase")


        data.product_rating = data.product_rating === "" ? null : Number(data.product_rating);
        data.fragile_item = data.fragile_item === "" ? null : Number(data.fragile_item);
        data.warranty_available = data.warranty_available === "" ? null : Number(data.warranty_available);
        data.delayed_delivery = data.delayed_delivery === "" ? null : Number(data.delayed_delivery);
        data.wishlist_before_purchase = data.wishlist_before_purchase === "" ? null : Number(data.wishlist_before_purchase);
        data.discount_percent = data.discount_percent === "" ? null : Number(data.discount_percent);
        data.review_count = data.review_count === "" ? null : Number(data.review_count);
        data.quantity = data.quantity === "" ? null : Number(data.quantity);
        data.product_return_rate = data.product_return_rate === "" ? null : Number(data.product_return_rate);
        data.brand_return_rate = data.brand_return_rate === "" ? null : Number(data.brand_return_rate);
        data.category_return_rate = data.category_return_rate === "" ? null : Number(data.category_return_rate);
        data.defect_rate = data.defect_rate === "" ? null : Number(data.defect_rate);
        data.seller_rating = data.seller_rating === "" ? null : Number(data.seller_rating);
        data.seller_return_rate = data.seller_return_rate === "" ? null : Number(data.seller_return_rate);
        data.shipping_distance_km = data.shipping_distance_km === "" ? null : Number(data.shipping_distance_km);
        data.support_calls = data.support_calls === "" ? null : Number(data.support_calls);
        data.product_page_views = data.product_page_views === "" ? null : Number(data.product_page_views);
        data.chat_messages = data.chat_messages === "" ? null : Number(data.chat_messages);
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/return/data/`,{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(data)

            })
            const response = await res.json()
            
            if(res.ok){
                const elapsedtime = Date.now() - starttime;
                if(elapsedtime < 2000){
                    await new Promise((resolve) => 
                    setTimeout(resolve, 2000 - elapsedtime))
                }
                
                return ({message : response.message,
                         data : response.data
                })
                
            }
            return {message : "Something went wrong", errors : res}
        }
        catch(err){
            return(err.message)
        }
        
    }

    const [result, formAction, isPending] = useActionState(predict, {"message" : "", data : null})
    return(
        <>
        <form action={formAction}>
            <div className="mx-4 my-4">
                <h1 className="text-center mb-4 fw-bold">RETURN PREDICT MODEL</h1>
                <div className="d-flex justify-content-between align-items-center my-5 ">
                    <span className="">Model : Logistic Regression</span>
                    <span className="badge rounded-pill p-2">ML Powered</span>
                </div>
                
            </div>
            
            <div className="d-flex">
                <div className="leftside">
                    <h5 className="mt-4 mx-4 mb-0">PRODUCTS</h5>
                    <div className="left mt-0">
                        <div className="m-4">
                            <label htmlFor="product_category" className="form-label">product category</label>
                            <select name="product_category" id="product_category" className="formswitch p-1" defaultValue="" required>
                                <option value="" disabled>Select a Product Category</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Toys">Toys</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Sports">Sports</option>
                                <option value="Home">Home</option>
                                <option value="Books">Books</option>
                            </select>
                        </div>
                        <div className="mb-4 mx-4 mt-4">
                            <label htmlFor="product_price" className="form-label">product price</label>
                            <input type="number" id="product_price" className="form-control" name="product_price" step="any" min="0" placeholder='Enter a number (e.g. 00.00)' required/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="discount_percent" className="form-label">discount</label>
                            <input type="number" id="discount_percent" className="form-control" name="discount_percent" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        
                        <div className="m-4">
                            <label htmlFor="review_count" className="form-label">review count</label>
                            <input type="number" id="review_count" className="form-control" name="review_count" placeholder='Enter a number (e.g. 0)'/>
                        </div>
                        <div className="m-4 form-check formswitch">
                            <label htmlFor="fragile" className="form-check-label">fragile</label>
                            <input type="checkbox" id="fragile" className="form-check-input" role="switch" name="fragile_item" />
                        </div>
                        
                    </div>
                    <div className="right mt-0">
                        <div className="m-4">
                            <label htmlFor="sub_category" className="form-label">sub_category</label>
                            <select name="sub_category" id="sub_category" className="formswitch p-1" defaultValue="" required>
                                <option value="" disabled>Select a Subcategory</option>
                                <option value="Haircare">Haircare</option>
                                <option value="Educational">Educational</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Men">Men</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Women">Women</option>
                                <option value="Skincare">Skincare</option>
                                <option value="Audio">Audio</option>
                                <option value="Team Sports">Team Sports</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Outdoor">Outdoor</option>
                                <option value="Makeup">Makeup</option>
                                <option value="Kids">Kids</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Decor">Decor</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Academic">Academic</option>
                                <option value="Action Figures">Action Figures</option>
                                <option value="Outdoor Play">Outdoor Play</option>
                            </select>
                        </div>
                        
                        <div className="m-4">
                            <label htmlFor="product_rating" className="form-label">product rating</label>
                            <input type="number" id="product_rating" className="form-control" name="product_rating" step = "any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="quantity" className="form-label">quantity</label>
                            <input type="number" id="quantity" className="form-control" name="quantity" placeholder='Enter a number (e.g. 0)'/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="brand" className="form-label">brand</label>
                            <select name="brand" id="brand" className="formswitch p-1" defaultValue="" required>
                                <option value="" disabled>Select a Brand</option>
                                <option value="Brand_23">Brand_23</option>
                                <option value="Brand_9">Brand_9</option>
                                <option value="Brand_21">Brand_21</option>
                                <option value="Brand_30">Brand_30</option>  
                                <option value="Brand_15">Brand_15</option>
                                <option value="Brand_7">Brand_7</option>
                                <option value="Brand_29">Brand_29</option>
                                <option value="Brand_28">Brand_28</option>
                                <option value="Brand_14">Brand_14</option>
                                <option value="Brand_13">Brand_13</option>
                                <option value="Brand_26">Brand_26</option>
                                <option value="Brand_1">Brand_1</option>
                                <option value="Brand_10">Brand_10</option>
                                <option value="Brand_17">Brand_17</option>
                                <option value="Brand_20">Brand_20</option>
                                <option value="Brand_19">Brand_19</option>
                                <option value="Brand_12">Brand_12</option>
                                <option value="Brand_27">Brand_27</option>
                                <option value="Brand_3">Brand_3</option>
                                <option value="Brand_22">Brand_22</option>
                                <option value="Brand_11">Brand_11</option>
                                <option value="Brand_4">Brand_4</option>
                                <option value="Brand_8">Brand_8</option>
                                <option value="Brand_16">Brand_16</option>
                                <option value="Brand_6">Brand_6</option>
                                <option value="Brand_5">Brand_5</option>
                                <option value="Brand_25">Brand_25</option>
                                <option value="Brand_24">Brand_24</option>
                                <option value="Brand_2">Brand_2</option>
                                <option value="Brand_18">Brand_18</option>
                            </select>
                        </div>
                        <div className="m-4 form-check form-switch">
                            <label htmlFor="warranty" className="form-check-label">warranty</label>
                            <input type="checkbox" id="warranty" className="form-check-input" name="warranty_available" role="switch"/>
                        </div>
                    </div>

                    <h5 className="mt-4 mx-4 mb-0">RISK RATES</h5>
                    <div className="left mt-0">
                        <div className="mb-4 mx-4 mt-4">
                            <label htmlFor="product_return_rate" className="form-label">Product Return Rate</label>
                            <input type="number" id="product_return_rate" className="form-control" name="product_return_rate" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="brand_return_rate" className="form-label">Brand Return Rate</label>
                            <input type="number" id="brand_return_rate" className="form-control" name="brand_return_rate" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        
                    </div>
                    <div className="right mt-0">
                        <div className="m-4">
                            <label htmlFor="category_return_rate" className="form-label">Category Return Rate</label>
                            <input type="number" id="category_return_rate" className="form-control" name="category_return_rate" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="defect_rate" className="form-label">Defect Rate</label>
                            <input type="number" id="defect_rate" className="form-control" name="defect_rate" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                    </div>

                    <h5 className="mt-4 mx-4 mb-0">SELLER & LOGISTICS</h5>
                    <div className="left mt-0">
                        <div className="mb-4 mx-4 mt-4">
                            <label htmlFor="seller_rating" className="form-label">Seller Rating</label>
                            <input type="number" id="seller_rating" className="form-control" name="seller_rating" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        <div className="mb-4 mx-4 mt-4">
                            <label htmlFor="seller_return_rate" className="form-label">Seller Return Rate</label>
                            <input type="number" id="seller_return_rate" className="form-control" name="seller_return_rate" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="fulfillment" className="form-label">Fulfillment</label>
                            <select name="fulfillment_type" id="fulfillment" className="formswitch p-1" defaultValue="" required>
                                <option value="" disabled>Select a Fulfillment Type</option>
                                <option value="Marketplace Fulfilled">Marketplace Fulfilled</option>
                                <option value="Seller Fulfilled">Seller Fulfilled</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="right mt-0">
                        <div className="mb-4 mx-4 mt-4">
                            <label htmlFor="shipping_distance" className="form-label">Shipping Distance</label>
                            <input type="number" id="shipping_distance" className="form-control" name="shipping_distance_km" step="any" placeholder='Enter a number (e.g. 00.00)'/>
                        </div>
                        <div className="m-4 form-check form-switch">
                            <label htmlFor="delayed" className="form-check-label">Delayed</label>
                            <input id="delayed" className="form-check-input" type="checkbox" role="switch" name="delayed_delivery"/>
                        </div>
                    </div>

                    <h5 className="mt-4 mx-4 mb-0">CUSTOMERS</h5>
                    <div className="left mt-0">
                        <div className="mb-4 mx-4 mt-4">
                            <label htmlFor="payment_method" className="form-label">payment method</label>
                            <select name="payment_method" id="payment_method" className="formswitch p-1" defaultValue="" required>
                                <option value="" disabled>Select a Payment Method</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="COD">Cash On Delivery</option>
                                <option value="UPI">UPI</option>
                                <option value="Wallet">wallet</option>
                                <option value="Debit Card">Debit Card</option>
                            </select>
                        </div>
                        <div className="m-4">
                            <label htmlFor="page_views" className="form-label">page views</label>
                            <input type="number" id="page_views" className="form-control" name="product_page_views" placeholder='Enter a number (e.g. 00)'/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="chat_messages" className="form-label">chat messages</label>
                            <input type="number" id="chat_messages" className="form-control" name="chat_messages" placeholder='Enter a number (e.g. 00)'/>
                        </div>
                    </div>
                    <div className="right mt-0">
                        <div className="m-4 form-check form-switch">
                            <label htmlFor="wishlisted" className="form-check-label">wishlisted</label>
                            <input type="checkbox" id="wishlisted" className="form-check-input" name="wishlist_before_purchase" role="switch"/>
                        </div>
                        <div className="m-4">
                            <label htmlFor="support_calls" className="form-label">support calls</label>
                            <input type="number" id="support_calls" className="form-control" name="support_calls" placeholder='Enter a number (e.g. 00)'/>
                        </div>
                        
                    </div>
                </div>


                <div className="rightside mx-2 p-2">
                    <h5 className="mb-3">MODEL PERFORMANCE</h5>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="">Accuracy</label>
                        <label htmlFor="">85%</label>
                    </div>
                    <div className="progress mb-2">
                        <div className="progress-bar bg-primary" style = {{width : "85%"}}></div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="">Precision</label>
                        <label htmlFor="">71%</label>
                    </div>
                    
                    <div className="progress mb-2">
                        <div className="progress-bar bg-success" style = {{width : "71%"}}></div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="">Recall Score</label>
                        <label htmlFor="">86%</label>
                    </div>
                    
                    <div className="progress mb-2">
                        <div className="progress-bar bg-warning" style = {{width : "86%"}}></div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="">F1 Score</label>
                        <label htmlFor="">78%</label>
                    </div>
                    
                    <div className="progress mb-2">
                        <div className="progress-bar bg-danger" style = {{width : "78%"}}></div>
                    </div>
                </div>
            </div>
            <Returnpercentage data = {result.data}/>
            <div className="d-grid gap-2 col-8 mx-auto mb-4">
                <p className="text-center">Click the button below to start prediction</p>
                <button disabled = {isPending} className="btn btn-primary">{isPending ? "PREDICTING..." : "PREDICT"}</button>
            </div>
        </form>
        
        
        
        </>
    )
}
export default Returnpredict