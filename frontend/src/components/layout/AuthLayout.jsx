import React from 'react'
import ImageCarousel from "../../components/ImageCarousel";
import NavBar from './NavBar';


function Authlayout() {
    return (
        <div>
          {/* Navbar here */}
          <NavBar />
    
          <header>
            <ImageCarousel />
          </header>
    
          {/* Rest of your content */}
        </div>
      );
}

export default Authlayout
