import React, {useEffect, useLayoutEffect} from "react"
import {useRecoilValue} from "recoil";
import {tokenAtom} from "~/atom/token.atom";
import {useLocation} from "react-use";
import {useRouter} from "next/router";

export function useRedirect() {
  const token = useRecoilValue(tokenAtom);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "object") {
      return
    }
    if (!token && router.pathname === "/write") {
      router.push("/login")
    }

  }, [token, router])

}