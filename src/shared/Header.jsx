import React, { useEffect, useState } from 'react';
import logo from "/logo.png"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navState, setNavState] = useState(false);

  const onNavScroll = () => {
    if (window.scrollY > 100) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  // scroll top
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
  }, []);

  return (
    <div className={`fixed w-full px-5 py-3 z-50 bg-white ${navState ? 'border-b border-title ' : ''}`}>

      <div className='container mx-auto flex justify-between gap-5 items-center '>
        {/* Logo nad name */}
        <div className='flex gap-5 '>
          <Link to="/" className='flex justify-center items-center gap-5'>
            <img className='w-10' src={logo} alt="" />
            <div>
              <p className='text-xl md:text-2xl text-[#20BCD8]'>Shopnojoyee</p>
              <p className='text-xs '>Academic Care</p>
            </div>
          </Link>
        </div>

        {/* NavItems in the center */}
        <ul className='hidden lg:flex justify-center gap-5 items-center'>
          <li className='cursor-pointer hover:text-[#20BCD8]'>
            <a>Teachers</a>
          </li>
          <li className='cursor-pointer hover:text-[#20BCD8]'>
            <a>Lectures</a>
          </li>
          <li className='cursor-pointer hover:text-[#20BCD8]'>
            <a>About us</a>
          </li>
          <li className='cursor-pointer hover:text-[#20BCD8]'>
            <a>Admission</a>
          </li>
        </ul>

        {/* Toggle Icon */}
        <div className='lg:hidden inline-block'>
          <label className="btn btn-circle swap swap-rotate bg-transparent hover:text-black">
            <input onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)} type="checkbox" checked={isMenuOpen} />

            {/* hamburger icon */}
            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

            {/* close icon */}
            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
          </label>
        </div>

        {
          isMenuOpen &&
          // NavItems
          <ul onClick={() => setIsMenuOpen(false)} className="absolute lg:hidden top-24 right-2 duration-300 border border-[#20BCD8] bg-white z-50 p-2 menu w-56 rounded-box">
            <li className='cursor-pointer hover:text-[#20BCD8]'>
              <a>Teachers</a>
            </li>
            <li className='cursor-pointer hover:text-[#20BCD8]'>
              <a>Lectures</a>
            </li>
            <li className='cursor-pointer hover:text-[#20BCD8]'>
              <a>About us</a>
            </li>
            <li className='cursor-pointer hover:text-[#20BCD8]'>
              <a>admission</a>
            </li>
          </ul>
        }
      </div>
    </div>
  );
};

export default Navbar;