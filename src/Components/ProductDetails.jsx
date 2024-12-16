import React,{useState,useEffect} from 'react';
import { FaArrowRight } from 'react-icons/fa'; 
import SizeSelector from './SizeSelector';
import AddToCartContainer from './AddCartContainer';
import ExtrasSelector from './ExtrasSelector';
import extrasData from "../Data/dataExtras";

const OrderDetails = ({ setShowProductDetails,product }) => {
  const [animate, setAnimate] = useState(false);
  const [selectedSize, setSelectedSize] = useState(Number(product.sizesAndPrices[0].id));
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

  useEffect(() => {
    // this code to update total price depending on selectedSize, selectedExtras for every change in selectedSize or selectedExtras
    const sizePrice = selectedSize ? product.sizesAndPrices.find(size => size.id === selectedSize)?.price : 0;
    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = extrasData.find(extra => extra.id === extraId);
      return total + (extra ? extra.price : 0);
    }, 0);
    
    setTotalPrice(sizePrice + extrasPrice);
  }, [selectedSize, selectedExtras]);

  const handleClose = () => {
    // Remove the animation class before unmounting
    setAnimate(false);
    setShowProductDetails(false)
  };

  return (

    <>
        <div className={`product-details-container ${animate ? 'slide-in' : 'slide-out'}`}>
          <main>
            <div className="product-details-first-section">
              <div className="return-arrow-container" onClick={() => {handleClose()}}>
                <FaArrowRight></FaArrowRight>
              </div>
              <div className="product-infos-container">
                <img src={product.image} alt="" />
                <span className='product-name'>
                  برجر بالمشروم
                </span>
                <p className='product-description'>
                  برجر بالمشروم برجر بالمشروم برجر بالمشروم برجر بالمشروم برجر بالمشروم برجر بالامشروم بارةبكم بالرحجرببشلملاومش 
                </p>
              </div>
            </div>
            <div className="product-choices-container">
              <SizeSelector 
                sizesAndPrices={product.sizesAndPrices}  
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize} 
              />
              <ExtrasSelector
                extrasData={extrasData}
                selectedExtras={selectedExtras}
                setSelectedExtras={setSelectedExtras}
              />
            </div>
          </main>
          <div className="total-addtocart-container">
            <AddToCartContainer
              totalPrice={totalPrice}
              handleAddToCart={() => {
                const productToCart = {
                  id: product.id,
                  name: product.name,
                  size: selectedSize,
                  extras: selectedExtras,
                  price:totalPrice,
                };
                console.log(productToCart);
                //setCart((prevCart) => [...prevCart, productToCart]); // replace this with actual code that pushs code to cart 
              }}
            />
          </div>
        </div>
    </>
  );
};

export default OrderDetails;