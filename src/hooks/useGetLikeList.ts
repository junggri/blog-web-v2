import {useQuery} from "@apollo/client";
import {GET_LIST} from "~/cores/query";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export interface IResult {
  getLikeList: string[]
}


export default function useGetLikeList(): [string[], Dispatch<SetStateAction<string[]>>] {
  const [likeList, setLikeList] = useState<string[]>([]);

  const {data} = useQuery<IResult>(GET_LIST);

  useEffect(() => {
    if (data) {
      setLikeList(data.getLikeList)
    }
  }, [data])

  return [likeList, setLikeList]
}