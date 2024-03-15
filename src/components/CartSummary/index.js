// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalPrice = cartList
        .map(eachProduct => eachProduct.quantity * eachProduct.price)
        .reduce((previousValue, currentValue) => previousValue + currentValue)
      const noOfCartItems = cartList.length
      return (
        <>
          <div className="cart-summary-container">
            <div className="cart-summary-card-container">
              <h1 className="total-order-container">
                Order Total:
                <span className="total-order-price"> Rs {totalPrice}/-</span>
              </h1>
              <p className="no-of-cart-items">{noOfCartItems} items in cart</p>
              <button className="checkout-button" type="button">
                checkout
              </button>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
