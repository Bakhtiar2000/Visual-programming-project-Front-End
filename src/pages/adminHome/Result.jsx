import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import Swal from "sweetalert2";

const Result = ({ res, index }) => {
  const { studentName, bangla, islam, gpa, science, english, math } = res;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isResultEditClicked, setIsResultEditClicked] = useState(false);

  const onResultSubmit = data => {
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
    setIsResultEditClicked(false);
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
  }

  return (
    <tr className="bg-base-200 hover">
      <td>{index + 1}</td>
      {
        !isResultEditClicked ?
          <>
            <td>{studentName}</td>
            <td>{bangla}</td>
            <td>{english}</td>
            <td>{math}</td>
            <td>{science}</td>
            <td>{islam}</td>
            <td>{gpa}</td>
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
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.bangla && "border border-red-500"}`}
                defaultValue={bangla}
                type="number"
                {...register("bangla", { required: true, min: 0, max: 100 })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.english && "border border-red-500"}`}
                defaultValue={english}
                type="number"
                {...register("english", { required: true, min: 0, max: 100 })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.math && "border border-red-500"}`}
                defaultValue={math}
                type="number"
                {...register("math", { required: true, min: 0, max: 100 })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.science && "border border-red-500"}`}
                defaultValue={science}
                type="number"
                {...register("science", { required: true, min: 0, max: 100 })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.islam && "border border-red-500"}`}
                defaultValue={islam}
                type="number"
                {...register("islam", { required: true, min: 0, max: 100 })}
              />
            </td>
            <td>
              <input
                className={`h-4 w-full outline-none px-2 rounded ${errors?.gpa && "border border-red-500"}`}
                defaultValue={gpa}
                type="number"
                {...register("gpa", { required: true, min: 0, max: 5 })}
              />
            </td>
          </>
      }
      <td className="flex justify-center items-center gap-5 lg:gap-8 cursor-pointer mx-auto">
        {
          !isResultEditClicked ?
            <AiOutlineDelete
              onClick={handleCaseDelete}
              className="hover:bg-red-100 text-red-500 rounded-full text-3xl p-1"
            /> :
            <IoMdClose
              onClick={() => setIsResultEditClicked(false)}
              className="hover:bg-red-100 text-red-500 rounded-full text-3xl p-1"
            />
        }
        {
          !isResultEditClicked ?
            <FiEdit
              onClick={() => setIsResultEditClicked(true)}
              className="hover:bg-green-100 text-green-500 rounded-full text-3xl p-1"
            /> :
            <MdOutlineDone
              onClick={handleSubmit(onResultSubmit)}
              className="hover:bg-green-100 text-green-500 rounded-full text-3xl p-1"
            />
        }
      </td>
    </tr>
  );
};

export default Result;
