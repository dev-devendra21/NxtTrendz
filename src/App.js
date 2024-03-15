import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachId => eachId.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachQuantity => {
        if (eachQuantity.id === id) {
          return {...eachQuantity, quantity: eachQuantity.quantity + 1}
        }
        return eachQuantity
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachQuantity => {
        if (eachQuantity.id === id) {
          return {...eachQuantity, quantity: eachQuantity.quantity - 1}
        }
        return eachQuantity
      }),
    }))
    const {cartList} = this.state
    const exisitingProduct = cartList.find(eachProduct => eachProduct.id === id)
    if (exisitingProduct) {
      const isQuantityZero = cartList.find(
        eachProduct => eachProduct.quantity === 1,
      )
      if (isQuantityZero) {
        this.setState(previousValue => ({
          cartList: previousValue.cartList.filter(eachId => eachId.id !== id),
        }))
      }
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductExist = cartList.find(item => item.id === product.id)
    if (isProductExist) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct =>
          eachProduct.id === product.id
            ? {...eachProduct, quantity: eachProduct.quantity + 1}
            : eachProduct,
        ),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
