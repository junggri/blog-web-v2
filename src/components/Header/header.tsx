import Link from 'next/link';
import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import Layout from "~/component-system/Layout/layout";
import styles from "./header.module.scss";
import {useFormik} from "formik";
import {useMutation, useQuery} from "@apollo/client";
import {SUBSCRIBE, UNSUBSCRIBE} from "~/cores/mutation";
import {IS_SUBSCRIBE_USER} from "~/cores/query";
import UseValidationInput from "~/hooks/useValidationInput";


interface Header {
}

export interface IFormik {
  name: string
  email: string
  phoneNumber: string
}

interface Result {
  subscribe: any
}

interface UNSUBSCRIBE {
  unsubscribe: boolean
}

const Header: FC<Header> = memo(() => {
  const [click, setClick] = useState<boolean>(false);
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);

  const checkSubscribe = useQuery<{ isSubscribe: boolean }>(IS_SUBSCRIBE_USER,
    {
      errorPolicy: 'all',
      fetchPolicy: "no-cache"
    })

  const ref = useRef<HTMLDivElement | null>(null);

  const [request, {data}] = useMutation<Result>(SUBSCRIBE, {errorPolicy: "all", fetchPolicy: "no-cache"});
  const [unsubscribe, meta] = useMutation<UNSUBSCRIBE>(UNSUBSCRIBE);

  const {values, handleChange, handleSubmit} = useFormik<IFormik>({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: ""
    },
    onSubmit: () => {
      UseValidationInput(values)
      // request({
      //   variables: {data: values},
      // })
    }
  })

  const onClickSubscribeButton = useCallback(() => {
    setClick(true)
  }, [click])

  const onClickUnSubscribeButton = useCallback(() => {
    setClick(false)
    unsubscribe()
  }, [click])


  useEffect(() => {
    if (!checkSubscribe.data) {
      return
    }

    setIsSubscribe(checkSubscribe.data.isSubscribe)
  }, [checkSubscribe.data])


  useEffect(() => {
    if (!data) {
      return
    }
    if (data.subscribe) {
      setIsSubscribe(true);
    }
  }, [data])


  useEffect(() => {
    if (!meta.data) {
      return
    }

    if (meta.data.unsubscribe) {
      setIsSubscribe(false)
    }
  }, [meta.data]);

  return (
    <Layout className={styles.header}>
      <Link href="/">
        <a>
          <h1>정그리 블로그</h1>
        </a>
      </Link>
    </Layout>
  );
});

export default Header;
