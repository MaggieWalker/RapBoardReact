import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <div>
    <h1 id='header'>RapBoard React</h1>
    <nav>
      {/* {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div> */}
      {/* ) : ( */}
        {/* <div> */}
          {/* The navbar will show these links before you log in */}
          {/* <Link to="/login">Login</Link> */}
          {/* <Link to="/signup">Sign Up</Link> */}
        {/* </div> */}
      {/* )} } */}
    </nav>
    {/* <hr /> */}
  </div>
)


export default Navbar

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
