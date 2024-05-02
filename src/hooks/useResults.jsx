import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useResults = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: resultData = [], isLoading: resultLoading, refetch: resultRefetch } = useQuery({
        queryKey: ['resultData'],
        queryFn: async () => {
            const res = await axiosSecure.get("StudentResult/Fetch");
            return res.data;
        },
    });
    return [resultData, resultLoading, resultRefetch];
};

export default useResults;