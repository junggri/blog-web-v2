import {Post, Reply} from "~/cores/schema";

function useCalculateDate(target: Post | Reply | undefined): number[] {
  if(!target){
    return []
  }

  const kst = target.createdAt.toLocaleString().split("T")[0].split("-");

  const years = kst[0];
  const month = kst[1].replace(/^0/, "");
  const day = kst[2].replace(/^0/, "");

  return [years, month, day];
}

export default useCalculateDate;