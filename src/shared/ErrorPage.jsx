import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <img className='w-[800px] mb-10' src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?w=1380&t=st=1700375423~exp=1700376023~hmac=cce397be8f257dd4f563194054668d3fa509f7b060006779db292ecdbe819df3" alt="" />
            <Link to="/" className='w-fit py-3 px-2 rounded-lg hover:bg-[#20BCD8] hover:text-white text-xl border border-[#20BCD8] bg-white text-[#20BCD8] duration-300'>Back to Home</Link>
        </div>
        
    );
};

export default ErrorPage;