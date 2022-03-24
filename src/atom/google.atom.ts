import {atom} from "recoil";

export interface Visitor {
  getVisitor: {
    __typename: string
    totalsForAllResults: {
      __typename: string
      user: string
      session: string
    }
    rows: string
  }
}


export const GOOGLE_VISITOR = atom<Visitor | null>({
  key: "googleVisitor",
  default: null
})