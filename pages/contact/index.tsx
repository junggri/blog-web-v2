import React, {FC, memo, useEffect, useState} from "react";
import Header from "~/components/Header/header";
import HeaderNav from "~/components/headerNav/HeaderNav";
import styles from "./contact.module.scss";
import InputBox from "~/component-system/InputBox/InputBox";
import {useFormik} from "formik";
import {resolveSrv} from "dns";
import Button from "~/component-system/Button/button";
import {useMutation} from "@apollo/client";
import {CREATE_MESSAGE} from "~/cores/mutation";
import {create} from "domain";
import sanitize from "sanitize-html";
import {bool} from "prop-types";
import {HiHome} from "react-icons/hi";
import Layout from "~/component-system/Layout/layout";
import {useRouter} from "next/router";
import SeoHeader from "~/components/SeoHead/head";

interface Props {

}

interface Formik {
  name: string
  email: string
  phone: string
  content: string
}

const Contact: FC<Props> = memo(() => {
  const router = useRouter()
  const [submit, setSubmit] = useState<boolean>(false);
  const [createMessage, {data, loading, error}] = useMutation(CREATE_MESSAGE)

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneReg = /[^0-9]{0,11}$/g
    const filter = e.target.value.replace(phoneReg, "")
    e.target.value.replace(/^[^0-9]/g, "")

    setFieldValue("phone", filter)
  }

  const {values, resetForm, handleChange, handleSubmit, validateForm, setFieldValue} = useFormik<Formik>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      content: ""
    },
    onSubmit: async () => {
      if (submit) {
        setSubmit(!submit)
        return
      }
      createMessage({
        variables: {
          data: {
            name: sanitize(values.name),
            email: sanitize(values.email),
            phoneNumber: sanitize(values.phone),
            content: sanitize(values.content)
          }
        },
        errorPolicy: "all"
      })
      resetForm()
      setSubmit(!submit)
    }
  });

  useEffect(() => {
    if (loading) {

    }
  }, [loading])

  return (
    <>
      <SeoHeader title={"주인장에게 연락하기"} image={""} desc={"주인장에게 연락할 수 있는 통로입니다."} url={"https://junggri.com/contact"}/>
      <form onSubmit={handleSubmit}>
        <div className={styles.contact}>
          <div className={styles.iconsBox}>
            <span onClick={() => {
              router.push("/")
            }}
            >
              <HiHome/>
            </span>
          </div>

          <h1>CONTACT</h1>
          <h2>작성자</h2>
          <div className={styles.userData}>
            <InputBox name="name" value={values.name} type="text" placeholder="이름 * " handleChange={handleChange} className={styles.contactInput}/>
            <InputBox name="email" value={values.email} type="text" placeholder="이메일 * " handleChange={handleChange} className={styles.contactInput}/>
            <InputBox name="phone" value={values.phone} type="text" placeholder="핸드폰 번호(-없이) * " handleChange={onChangePhone} className={styles.contactInput} maxLength={11}/>
          </div>
          <div className={styles.content}>
            <h2>하고싶은 말</h2>
            <textarea name="content" id="text" cols={30} rows={5} placeholder="문의내용 *&#13;&#10;저에게 하고 싶은말을 남겨주시기 바랍니다." onChange={handleChange} value={values.content}/>
          </div>
          <div className={styles.button}>
            <Button className={styles.submitBtn}>
              {!submit ? <span>제출하기</span> : <span>답장을 기다려보세요(돌아가기)</span>}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
});


export default Contact;