import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
    const [resultSearch, setResultSearch] = useState("");

    const handleResultSearch = (name) => {
        console.log("Searching result for:", name);
        setResultSearch("");
    };

    return (
        <div>
            <div>
                <img className='hidden md:block w-full object-cover' src="https://i.ibb.co/vDL84dH/banner0.jpg" alt="" />
            </div>
            <div>
                <img className='md:hidden block w-full h-96 object-cover' src="https://i.ibb.co/ySmnqkN/banner2.jpg" alt="" />
            </div>

            <h2 className='text-3xl text-center mt-20 mb-5'>Find your result</h2>
            <div className="rounded-lg border border-black max-w-md mx-auto flex justify-between items-center mb-20">
                <input
                    className={`h-8 w-full rounded-lg outline-none px-2`}
                    onChange={(e) => setResultSearch(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                />
                <FaSearch onClick={() => handleResultSearch(resultSearch)} className="text-green-500 w-10 h-5 cursor-pointer" />
            </div>
        </div>
    );
};

export default Home;