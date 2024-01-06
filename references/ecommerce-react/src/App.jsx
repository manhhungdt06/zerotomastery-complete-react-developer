import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  currentUserSelector,
  isUserLoadingSelector
} from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions'

// Components
import Header from './components/Header/Header'
import OverlaySpinner from './components/OverlaySpinner/OverlaySpinner'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

// Pages
const Home = lazy(() => import('./pages/Home/Home'))
const Shop = lazy(() => import('./pages/Shop/Shop'))
const Checkout = lazy(() => import('./pages/Checkout/Checkout'))
const Auth = lazy(() => import('./pages/Auth/Auth'))

const App = ({ isUserLoading, currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      {isUserLoading ? (
        <OverlaySpinner />
      ) : (
        <div>
          <Header />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<OverlaySpinner />}>
                <Route exact path='/' component={Home} />
                <Route path='/shop' component={Shop} />
                <Route exact path='/checkout' component={Checkout} />
                <Route
                  exact
                  path='/auth'
                  render={() => (!currentUser ? <Auth /> : <Redirect to='/' />)}
                />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
  isUserLoading: isUserLoadingSelector
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
