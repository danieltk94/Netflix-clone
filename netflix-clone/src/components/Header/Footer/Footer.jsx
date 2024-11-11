import React from 'react'
import './Footer.css'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Footer = () => {
  return (
        <div className='footer'>
        <div className="footer_container">
            <div className="footer_icons">
            <FacebookOutlinedIcon />
            <InstagramIcon />
            <YouTubeIcon />
            </div>
            <div className="footer_nav">
            <div>
                <ul>
                <li>Audio Description</li>
                <li>Investor Relations</li>
                <li>Legal Notice</li>
                </ul>
            </div>
            <div>
                <ul>
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Cookie Preference</li>
                </ul>
            </div>
            <div>
                <ul>
                <li>Gift Cards</li>
                <li>Terms of Use</li>
                <li>Corporate Information</li>
                </ul>
            </div>
            <div>
                <ul>
                <li>Media Center</li>
                <li>Privacy</li>
                <li>Contact Us</li>
                </ul>
            </div>
            </div>
            <div className="footer_serviceCode">
            <p>
                Service Code
            </p>
            </div>
            <div className="footer_copyWrite">
            <span>&copy; 1997 - 2024 Netflix, Inc.</span> 
            </div>
        </div>
        </div>
  )
}

export default Footer
