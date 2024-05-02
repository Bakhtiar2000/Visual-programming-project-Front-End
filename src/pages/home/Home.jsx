import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Home = () => {
  const [axiosSecure] = useAxiosSecure()
  const [resultSearch, setResultSearch] = useState("");
  const [searchedResult, setSearchedResult] = useState()

  const handleResultSearch = (id) => {
    axiosSecure.get(`/StudentResult/get/${id}`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setSearchedResult(res.data);
        }
      })
      .catch(error => {
        Swal.fire({
          title: `${id} Not found`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      });
  };
  console.log(searchedResult);

  return (
    <div className='mb-20'>
      <div>
        <img className='hidden md:block w-full object-cover' src="https://i.ibb.co/vDL84dH/banner0.jpg" alt="" />
      </div>
      <div>
        <img className='md:hidden block w-full h-96 object-cover' src="https://i.ibb.co/ySmnqkN/banner2.jpg" alt="" />
      </div>

      <h2 className='text-3xl text-center mt-20 mb-5'>Find your result</h2>
      <div className="rounded-lg border border-black max-w-md mx-auto flex justify-between items-center mb-5">
        <input
          className={`h-8 w-full rounded-lg outline-none px-2`}
          onChange={(e) => setResultSearch(e.target.value)}
          placeholder="Enter your id"
          type="text"
        />
        <FaSearch onClick={() => handleResultSearch(resultSearch)} className="text-green-500 w-10 h-5 cursor-pointer" />
      </div>

      {
        searchedResult &&
        <table className="table text-center max-w-5xl mx-auto">
          <thead>
            <tr className='bg-[#a0e2ee]'>
              <th>ID</th>
              <th>Name</th>
              <th>Bangla</th>
              <th>English</th>
              <th>Math</th>
              <th>Science</th>
              <th>Islam</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{searchedResult?.studentId}</td>
              <td>{searchedResult?.studentName}</td>
              <td>{searchedResult?.bangla}</td>
              <td>{searchedResult?.english}</td>
              <td>{searchedResult?.math}</td>
              <td>{searchedResult?.science}</td>
              <td>{searchedResult?.islam}</td>
              <td>{searchedResult?.avg}</td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  );
};

export default Home;

