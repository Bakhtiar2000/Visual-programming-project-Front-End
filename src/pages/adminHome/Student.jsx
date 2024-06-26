import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxios";
import useStudents from "../../hooks/useStudents";

const Student = ({ student, index, studentSearch }) => {
  console.log(studentSearch);
  const [axiosSecure] = useAxiosSecure()
  const [studentData, , studentRefetch] = useStudents()
  const { studentId, studentName, className, studentAddress, email, phoneNumber } = student;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isStudentEditClicked, setIsStudentEditClicked] = useState(false);

  const onStudentSubmit = data => {
    const updatedStudent = {
      studentId: data?.id,
      studentName: data?.name,
      className: data?.class,
      studentAddress: data?.address,
      email: data?.email,
      phoneNumber: data?.phone,
    }
    console.log(updatedStudent);

    axiosSecure.post(`/Student/${studentId}`, updatedStudent)
    .then(res => {
      if (res.status === 200) {
        Swal.fire({
          title: `${studentName}'s info has been updated`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        studentRefetch();
        setIsStudentEditClicked(false);
        reset();
      }
    })
  }

  const handleCaseDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`Student/${studentId}`)
          .then(res => {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Deleted Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              studentRefetch()
            }
          })
      }
    });
  };

  console.log("Inside student: ", studentSearch);
  console.log("Student id: ", studentId);
  return (
    <tr className={`${studentSearch === studentId ? "bg-[#20BCD8]": "bg-base-200 "}`}>
      <td>{index + 1}</td>
      {
        !isStudentEditClicked ?
          <>
            <td>{studentId}</td>
            <td>{studentName}</td>
            <td>{className}</td>
            <td>{studentAddress}</td>
            <td>{email}</td>
            <td>{phoneNumber}</td>
          </> : <>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.id && "border border-red-500"}`}
                defaultValue={studentId}
                type="number"
                {...register("id", { required: true })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.name && "border border-red-500"}`}
                defaultValue={studentName}
                type="text"
                {...register("name", { required: true })}
              />
            </td>
            <td>
              <select
                className={`h-4 w-full outline-none px-2 rounded ${errors?.class && "border border-red-500"}`}
                {...register("class", { required: true })}
                defaultValue={className}
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
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.address && "border border-red-500"}`}
                defaultValue={studentAddress}
                type="text"
                {...register("address", { required: true })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.email && "border border-red-500"}`}
                defaultValue={email}
                type="email"
                {...register("email", { required: true })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.phone && "border border-red-500"}`}
                defaultValue={phoneNumber}
                type="text"
                {...register("phone", { required: true })}
              />
            </td>
          </>
      }
      <td className="flex justify-center items-center gap-5 lg:gap-8 cursor-pointer mx-auto">
        {
          !isStudentEditClicked ?
            <AiOutlineDelete
              onClick={handleCaseDelete}
              className="hover:bg-red-100 text-red-500 rounded-full text-3xl p-1"
            /> :
            <IoMdClose
              onClick={() => setIsStudentEditClicked(false)}
              className="hover:bg-red-100 text-red-500 rounded-full text-3xl p-1"
            />
        }
        {
          !isStudentEditClicked ?
            <FiEdit
              onClick={() => setIsStudentEditClicked(true)}
              className="hover:bg-green-100 text-green-500 rounded-full text-3xl p-1"
            /> :
            <MdOutlineDone
              onClick={handleSubmit(onStudentSubmit)}
              className="hover:bg-green-100 text-green-500 rounded-full text-3xl p-1"
            />
        }
      </td>
    </tr>
  );
};

export default Student;
