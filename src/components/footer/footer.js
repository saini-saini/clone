import React from 'react'
import { Link } from 'react-router-dom'
import instagram from '../../images/instagram.png'
import twitter from '../../images/twitter.png'
import facebook from '../../images/facebook.png'
import "./footer.css"
const Footer = () => {
  return (
    <div>
      <div className='footer-search'>

<div className='search-screen-footer'>

    <div className='footer-left'>
        <div className='footer-section1'>
            <h3 style={{ color: 'white', margin: "0px" }}>Company</h3>
            <Link className='footer-link'>About</Link>
            <Link className='footer-link'>Jobs</Link>
            <Link className='footer-link'>For the Record</Link>
        </div>

        <div className='footer-section1'>
            <h3 style={{ color: 'white', margin: "0px" }}>Communities</h3>
            <Link className='footer-link'>For Artists</Link>
            <Link className='footer-link'>Developers</Link>
            <Link className='footer-link'>Advertising</Link>
            <Link className='footer-link'>Investors</Link>
            <Link className='footer-link'>Vendors</Link>
        </div>

        <div className='footer-section1'>
            <h3 style={{ color: 'white', margin: "0px" }}>Useful links</h3>
            <Link className='footer-link'>Support</Link>
            <Link className='footer-link'>Free Mobile Apps</Link>
        </div>
    </div>

    <div className='footer-right'>
        <img src={instagram} alt="instagram" className='footer-icon' />
        <img src={twitter} alt="twitter" className='footer-icon' />
        <img src={facebook} alt="facebook" className='footer-icon' />
    </div>
</div>

<hr style={{ border: "1px solid gray" }} />

<div className='footer-bottom'>
    <div className='footer-bottom-left'>
        <Link className='footer-link'>Legal</Link>
        <Link className='footer-link'>Safety & Privacy Center</Link>
        <Link className='footer-link'>Privacy Policy</Link>
        <Link className='footer-link'>Cookies</Link>
        <Link className='footer-link'>About Ads</Link>
        <Link className='footer-link'>Accessibility</Link>
    </div>

    <div className='footer-bottom-right'>
        © 2024 Spotify AB
    </div>
</div>
</div>
    </div>
  )
}

export default Footer
