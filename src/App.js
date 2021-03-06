import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth ,createUserProfileDocument} from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import {setCurrentUser} from './redux/user/user-actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user-selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          onSnapshot(userRef, (snapshot) =>{
            setCurrentUser({
                  id : snapshot.id,
                  ...snapshot.data()
                });
          });
          
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
      return (
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/signin' element={ this.props.currentUser ?  (<Navigate  to="/" />) : <SignInAndSignUp /> } />
          </Routes> 
        </div>
      );
   }
}

const mapStateToprops = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToprops,mapDispatchToProps)(App);
