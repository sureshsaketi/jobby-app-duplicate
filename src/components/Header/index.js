import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navbar-bg-container">
      <nav className="nav-mobile-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-mobile"
          />
        </Link>
        <ul className="nav-icons-container">
          <li>
            <Link to="/">
              <AiFillHome className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsFillBriefcaseFill className="nav-icon" />
            </Link>
          </li>
          <li>
            <FiLogOut className="nav-icon" onClick={onClickLogout} />
          </li>
        </ul>
      </nav>
      <nav className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-lg"
          />
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="link-item">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-item">
              <p>Jobs</p>
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </div>
  )
}
export default withRouter(Header)
