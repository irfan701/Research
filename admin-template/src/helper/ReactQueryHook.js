import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


export const UseQuery = (queryKey, queryFn,staleTime=0) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: () => queryFn,
        staleTime:staleTime
    })
}
export const  UseMutation= (mutationFn,onSuccess,onError)=>useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError
})



export const InvalidateQueries=async (queryKey)=>{
    const queryClient = useQueryClient()
    return await queryClient.invalidateQueries({queryKey:queryKey})
}




