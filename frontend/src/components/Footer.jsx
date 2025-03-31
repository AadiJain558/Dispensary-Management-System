import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="mb-4 inline-block">
              <img src={assets.logo} alt="Prescripto" className="h-10" />
            </Link>
            <p className="text-muted-foreground mt-4 pr-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 uppercase tracking-wider">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 uppercase tracking-wider">GET IN TOUCH</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                +1-212-456-7890
              </li>
              <li className="text-muted-foreground">
                greatstack.dev@gmail.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>Copyright © 2024 GreatStack - All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 