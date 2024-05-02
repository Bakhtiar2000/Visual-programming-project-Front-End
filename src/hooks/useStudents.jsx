import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useStudents = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: studentData = [], isLoading: studentLoading, refetch: studentRefetch } = useQuery({
        queryKey: ['studentData'],
        queryFn: async () => {
            const res = await axiosSecure.get("Student/Fetch");
            return res.data;
        },
    });
    return [studentData, studentLoading, studentRefetch];
};

export default useStudents;