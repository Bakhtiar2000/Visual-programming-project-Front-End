import React, { useEffect, useState } from "react";
import Student from "./Student";
import Result from "./Result";
import { FaSearch } from "react-icons/fa";
import CustomModal from "../../utilities/CustomModal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pass, setPass] = useState("ADMIN");
  const [error, setError] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [accessDenied, setAccessDenied] = useState(false);
  const denialPeriod = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const navigate = useNavigate()
  const [studentSearch, setStudentSearch] = useState("");
  const [resultSearch, setResultSearch] = useState("");
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetch("https://localhost:7200/api/Student/Fetch")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  useEffect(() => {
    fetch("https://localhost:7200/api/StudentResult/Fetch")
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  const handleStudentSearch = (name) => {
    console.log("Searching information for:", name);
    setStudentSearch("");
  };

  const handleResultSearch = (name) => {
    console.log("Searching result for:", name);
    setResultSearch("");
  };

  const onStudentDataSubmit = data => {
    const addedStudent = {
      studentName: data?.name,
      className: data?.class,
      studentAddress: data?.address,
      email: data?.email,
      phoneNumber: data?.phone,
    }
    console.log(addedStudent);
    setIsStudentModalOpen(false)
    reset()
  }

  const onResultDataSubmit = data => {
    const updatedResult = {
      studentName: data?.name,
      bangla: data?.bangla,
      english: data?.english,
      math: data?.math,
      science: data?.science,
      islam: data?.islam,
      gpa: data?.gpa
    }
    console.log(updatedResult);
    setIsResultModalOpen(false)
    reset()
  }

  useEffect(() => {
    const denialTimestamp = localStorage.getItem('accessDenialTimestamp');
    if (denialTimestamp) {
      const currentTime = Date.now();
      if (currentTime - parseInt(denialTimestamp, 10) < denialPeriod) {
        setAccessDenied(true);
      } else {
        setAccessDenied(false);
        localStorage.removeItem('accessDenialTimestamp');
      }
    }
  }, []);

  useEffect(() => {
    if (isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  const handlePasswordSubmit = e => {
    e.preventDefault();
    const password = e.target.password.value;

    if (password !== pass) {
      setError('Password did not match');
      setWrongAttempts(prevAttempts => prevAttempts + 1); // Increment attempts
      if (wrongAttempts + 1 >= 5) {
        const timestamp = Date.now().toString();
        localStorage.setItem('accessDenialTimestamp', timestamp); // Store denial timestamp
        setAccessDenied(true); // Set access denied after 5 attempts
        setIsAdmin(false);
      }
    } else {
      setError('');
      setIsAdmin(true);
    }
  };

  if (accessDenied) {
    Swal.fire({
      icon: "error",
      title: "Access Denied!",
      text: "You cannot access admin route!"
    });
    navigate("/")
  }

  return (
    <>
      {
        !isAdmin ?
          <div className='h-screen flex justify-center items-center'>
            <div>
              <h2 className='text-2xl md:text-3xl lg:text-4xl duration-300 text-title mb-5 lg:mb-8'>Enter Admin Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  className='w-52 md:w-64 lg:w-80 duration-300 block rounded outline-none border border-[#20BCD8] py-1 px-2'
                  onClick={() => setError("")}
                  type="password"
                  name="password"
                  id='password'
                />
                {
                  error &&
                  <>
                    <p className='text-red-500 mt-2'>{error}</p>
                    <p className='text-title bg-red-50 w-52 md:w-64 lg:w-80 rounded p-2 mt-2'>N.B. You cannot access admin route for 3 hours after 5 continuous wrong attempts.</p>
                  </>
                }

                <input
                  className='mt-3 lg:mt-5 rounded lg:text-lg cursor-pointer bg-title px-3 py-1 w-fit hover:bg-[#20BCD8] text-white duration-300'
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div> :
          <div>
            <h2 className="text-3xl text-center pt-24 mb-5">Student Information</h2>
            <div className="rounded-lg border border-black max-w-md mx-auto flex justify-between items-center mb-5">
              <input
                className={`h-8 w-full rounded-lg outline-none px-2`}
                onChange={(e) => setStudentSearch(e.target.value)}

                placeholder="Search by name"
                type="text"
              />
              <FaSearch onClick={() => handleStudentSearch(studentSearch)} className="text-green-500 w-10 h-5 cursor-pointer" />
            </div>
            <div className="overflow-x-auto mb-10 w-full mx-auto max-w-4xl rounded">
              <table className="table table-zebra text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Address</th>
                    <th>Mail</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <Student key={index} student={student} index={index}></Student>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center mt-5">
                <button onClick={() => setIsStudentModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">
                  Add student
                </button>
              </div>
            </div>

            <h2 className="text-3xl text-center my-5">Result Information</h2>
            <div className="rounded-lg border border-black max-w-md mx-auto flex justify-between items-center mb-5">
              <input
                className={`h-8 w-full rounded-lg outline-none px-2`}
                onChange={(e) => setResultSearch(e.target.value)}
                placeholder="Search by name"
                type="text"
              />
              <FaSearch onClick={() => handleResultSearch(resultSearch)} className="text-green-500 w-10 h-5 cursor-pointer" />
            </div>
            <div className="overflow-x-auto mb-10 w-full mx-auto max-w-4xl rounded">
              <table className="table table-zebra text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Bangla</th>
                    <th>English</th>
                    <th>Math</th>
                    <th>Science</th>
                    <th>Islam</th>
                    <th>GPA</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((res, index) => (
                    <Result key={index} res={res} index={index}></Result>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-5">
                <button onClick={() => setIsResultModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">
                  Add result
                </button>
              </div>
            </div>

            {
              isStudentModalOpen &&
              <CustomModal
                isModalOpen={isStudentModalOpen}
                setIsModalOpen={setIsStudentModalOpen}
              >

                <form onSubmit={handleSubmit(onStudentDataSubmit)}>
                  <h3 className="font-bold text-title text-xl text-green-700 mb-2">Add Student</h3>
                  <p className='border-t border-dark mb-5'></p>

                  <div className="flex justify-between items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm">Student name</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.name ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="text"
                        {...register("name", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-sm">Class</label>
                      <select
                        className={`h-8 w-full  border outline-none px-2 rounded ${errors?.class ? "border-red-500" : "border-[#20BCD8]"}`}
                        {...register("class", { required: true })}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="text-sm">Student Address</label>
                    <input
                      className={`h-8 w-full border outline-none px-2 rounded ${errors?.address ? "border-red-500" : "border-[#20BCD8]"}`}
                      type="text"
                      {...register("address", { required: true })}
                    />
                  </div>

                  <div className="flex justify-between items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm">Email address</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.email ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="email"
                        {...register("email", { required: true })}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-sm">Phone number</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.phone ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="text"
                        {...register("phone", { required: true })}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <input
                    className="mt-5 text-center px-3 md:px-5 py-1 md:py-3 bg-[#20BCD8] hover:bg-[#458894] hover:bg-title duration-300 rounded-lg text-white cursor-pointer"
                    type="submit"
                    value="Save Changes"
                  />
                </form>
              </CustomModal>
            }

            {
              isResultModalOpen &&
              <CustomModal
                isModalOpen={isResultModalOpen}
                setIsModalOpen={setIsResultModalOpen}
              >

                <form onSubmit={handleSubmit(onResultDataSubmit)}>
                  <h3 className="font-bold text-title text-xl text-green-700 mb-2">Add Result</h3>
                  <p className='border-t border-dark mb-5'></p>

                  <div className="flex justify-between items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm">Student name</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.name ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="text"
                        {...register("name", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm">Bangla score</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.bangla ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="number"
                        {...register("bangla", { required: true, min: 0, max: 100 })}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-sm">English score</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.english ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="number"
                        {...register("english", { required: true, min: 0, max: 100 })}
                      />
                    </div>
                  </div>


                  <div className="flex justify-between items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm">Math score</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.math ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="number"
                        {...register("math", { required: true, min: 0, max: 100 })}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-sm">Science score</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.science ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="number"
                        {...register("science", { required: true, min: 0, max: 100 })}
                      />
                    </div>
                  </div>


                  <div className="flex justify-between items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm">Islam score</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.islam ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="number"
                        {...register("islam", { required: true, min: 0, max: 100 })}
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-sm">GPA</label>
                      <input
                        className={`h-8 w-full border outline-none px-2 rounded ${errors?.gpa ? "border-red-500" : "border-[#20BCD8]"}`}
                        type="number"
                        {...register("gpa", { required: true, min: 0, max: 5 })}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <input
                    className="mt-5 text-center px-3 md:px-5 py-1 md:py-3 bg-[#20BCD8] hover:bg-[#458894] hover:bg-title duration-300 rounded-lg text-white cursor-pointer"
                    type="submit"
                    value="Save Changes"
                  />
                </form>
              </CustomModal>
            }
          </div>

      }
    </>
  );
};

export default Home;

<div className="overflow-x-auto"></div>;
