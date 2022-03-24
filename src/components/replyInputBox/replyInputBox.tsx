import React, {FC, memo} from "react";
import InputBox from "~/component-system/InputBox/InputBox";
import Button from "~/component-system/Button/button";
import styles from "./replyInputBox.module.scss";
import classNames from "classnames";
import TextAreaBox from "~/component-system/TextareaBox/TextAreaBox";
import {useFormik} from "formik";
import {Maybe} from "~/cores/schema";
import {UseValidation} from "~/hooks/useValidation";

interface Props {
  title: string
  className?: string
  upsertReply: any
  hashId: string
  placeHolder?: string
  parentId: Maybe<number> | undefined
  renderAfterCreate?: any
}

export interface Formik {
  reply: string,
  username: string,
  password: string
}

const ReplyInputBox: FC<Props> = memo(({
                                         title,
                                         upsertReply,
                                         hashId,
                                         className,
                                         parentId,
                                         renderAfterCreate = undefined,
                                         placeHolder = "댓글을 입력해 주세요."
                                       }) => {
  const onSubmit = async () => {
    if (UseValidation(values)) {
      //TODO
      //모달을 만들거나 알럿창 만들기
      //react-toast
      return
    }

    upsertReply({
      variables: {
        data: {
          postTitle: title,
          hashId: hashId,
          comment: values.reply,
          writer: values.username,
          parentId: parentId
        }
      },
      errorPolicy: "all"
    });

    if (renderAfterCreate) {
      renderAfterCreate()
    }

    resetForm()
  };

  const {values, resetForm, handleChange, handleSubmit, validateForm, setFieldValue} = useFormik<Formik>({
    initialValues: {
      reply: "",
      username: "",
      password: ""
    },
    onSubmit: onSubmit,
  });

  return (
    <div className={classNames(styles.replyInputBox, className)}>
      <TextAreaBox
        name="reply"
        placeholder={placeHolder}
        onChange={handleChange}
        values={values.reply}
        className={styles.textarea}
      />
      <form onSubmit={handleSubmit}>
        <div className={styles.buttonBox}>
          <div className={styles.inputBox}>
            <InputBox
              name="username"
              value={values.username}
              type="text"
              placeholder="작성자"
              handleChange={handleChange}
            />
            <InputBox
              name="password"
              value={values.password}
              type="password"
              placeholder="비밀번호"
              handleChange={handleChange}
            />
          </div>
          <Button>
            작성하기
          </Button>
        </div>
      </form>
    </div>
  );
});

export default ReplyInputBox;