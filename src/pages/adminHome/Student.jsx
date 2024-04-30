import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import Swal from "sweetalert2";

const Student = ({ student, index }) => {
  const { _id, studentName, className, studentAddress, email, phoneNumber } = student;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isStudentEditClicked, setIsStudentEditClicked] = useState(false);

  const onStudentSubmit = data => {
    const updatedStudent = {
      studentName: data?.name,
      className: data?.class,
      studentAddress: data?.address,
      email: data?.email,
      phoneNumber: data?.phone,
    }
    console.log(updatedStudent);
    setIsStudentEditClicked(false);
    reset();
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

      }
    });
  };
  return (
    <tr onSubmit={handleSubmit(onStudentSubmit)} className="bg-base-200 hover">
      <td>{index + 1}</td>
      {
        !isStudentEditClicked ?
          <>
            <td>{studentName}</td>
            <td>{className}</td>
            <td>{studentAddress}</td>
            <td>{email}</td>
            <td>{phoneNumber}</td>
          </> : <>
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
