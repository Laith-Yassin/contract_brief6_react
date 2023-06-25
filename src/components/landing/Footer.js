import React from 'react';
import '../styles/Footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
  return (
    <div>
      {/* Site footer */}
      <footer className="site-footer">
        
        <div className="container1">
          <div className="row ">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2023 All Rights Reserved by 
                <a href="smart"> Smart Solutions</a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
              <li><a className="facebook" href="facebook"><FacebookOutlinedIcon /></a></li>
                <li><a className="twitter" href="twitter"><LinkedInIcon /></a></li>
                <li><a className="github" href="github"><GitHubIcon /></a></li>
                <li><a className="linkedin" href="linkedin"><TwitterIcon /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
