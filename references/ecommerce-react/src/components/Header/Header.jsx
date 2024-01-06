import React from 'react'

import { connect } from 'react-redux'
import { signOutStart } from '../../redux/user/user.actions'
import { createStructuredSelector } from 'reselect'
import { cartVisibilitySelector } from '../../redux/cart/cart.selectors'
import { currentUserSelector } from '../../redux/user/user.selectors'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../CartIcon/CartIcon'
import CartDropdown from '../CartDropdown/CartDropdown'

// Styled components
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './Header.styles'

const Header = ({ currentUser, isCartHidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/contact'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          Sign out
        </OptionLink>
      ) : (
        <OptionLink to='/auth'>Sign In</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {!isCartHidden ? <CartDropdown /> : null}
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
  isCartHidden: cartVisibilitySelector
})

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
