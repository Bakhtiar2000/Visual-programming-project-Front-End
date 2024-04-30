import logo from "/logo.png"
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className=" bg-white border-t border-title">
            <div className='container max-w-5xl mx-auto py-10 md:flex justify-between gap-5 z-50'>
                <div className='mb-10 md:mb-0 w-fit'>
                  <img className="w-40" src={logo} alt="" />
                  <div className="flex justify-center gap-3 items-center mt-5">
                    <a href="https://www.facebook.com/SAC122018/" target="_blank" className="flex justify-center items-center rounded-full border border-[#20BCD8] w-8 h-8 text-[#20BCD8] hover:bg-[#20BCD8]/80 hover:text-white duration-300 cursor-pointer">
                      <FaFacebookF />
                    </a>
                    <a href="https://www.youtube.com/@shopnojoyee1737" target="_blank" className="flex justify-center items-center rounded-full border border-[#20BCD8] w-8 h-8 text-[#20BCD8] hover:bg-[#20BCD8]/80 hover:text-white duration-300 cursor-pointer">
                      <FaYoutube />
                    </a>
                  </div>
                </div> 

                <div className='flex flex-col mb-10 md:mb-0 w-fit'>
                  <header className='text-xl text-[#20BCD8] mb-1'>Quick Links</header> 
                  <p className='border rounded border-[#20BCD8] mb-2 w-16'></p>
                 <a className="hover:underline hover:text-title duration-300">About us</a>
                 <a className="hover:underline hover:text-title duration-300">Admission</a>
                 <a className="hover:underline hover:text-title duration-300">Lectures</a>
                 <a className="hover:underline hover:text-title duration-300">Contact</a>
                </div> 

                <div className='mb-10 md:mb-0 w-fit'>
                <header className='text-xl text-[#20BCD8] mb-1'>Contact Us</header> 
                  <p className='border rounded border-[#20BCD8] mb-2 w-16'></p>
                  <p>Dakshinkhan Girls School Road</p>
                  <p>Dakshinkhan, Dhaka, Bangladesh</p>
                  <p>shapnojoyee@gmail.com</p>
                  <p>01908-115192</p>
                </div>
            </div> 
        </footer>
    );
};

export default Footer;