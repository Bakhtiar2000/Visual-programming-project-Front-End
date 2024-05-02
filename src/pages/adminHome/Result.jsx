import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxios";
import useResults from "../../hooks/useResults";

const Result = ({ res, index, resultSearch }) => {
  // console.log(resultSearch);
  const [axiosSecure] = useAxiosSecure()
  const [resultData, , resultRefetch] = useResults()
  const { studentId, studentName, bangla, islam, avg, science, english, math } = res;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isResultEditClicked, setIsResultEditClicked] = useState(false);

  const onResultSubmit = data => {
    const updatedResult = {
      studentId: data?.id,
      studentName: data?.name,
      bangla: data?.bangla,
      english: data?.english,
      math: data?.math,
      science: data?.science,
      islam: data?.islam,
      avg: ((parseInt(data?.bangla) + parseInt(data?.english) + parseInt(data?.math) + parseInt(data?.science) + parseInt(data?.islam)) / 5).toString()
    }
    console.log(updatedResult);

    axiosSecure.post(`/StudentResult/${studentId}`, updatedResult)
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            title: `${studentName}'s result has been updated`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          resultRefetch();
          setIsResultEditClicked(false);
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
        axiosSecure.delete(`StudentResult/${studentId}`)
          .then(res => {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Deleted Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              resultRefetch()
            }
          })
      }
    });
  }

  return (
    <tr className={` ${resultSearch == studentId ? "bg-green-200" : "bg-base-200"}`}>
      <td>{index + 1}</td>
      {
        !isResultEditClicked ?
          <>
            <td>{studentId}</td>
            <td>{studentName}</td>
            <td>{bangla}</td>
            <td>{english}</td>
            <td>{math}</td>
            <td>{science}</td>
            <td>{islam}</td>
            <td>{avg}</td>
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
                className={`h-4 w-full outline-none px-2 rounded`}
                defaultValue={avg}
                readOnly
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
