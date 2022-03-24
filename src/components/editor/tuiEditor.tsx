import React, {ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from "./tuiEditor.module.scss";
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight
//@ts-ignore
  from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import 'tui-color-picker/dist/tui-color-picker.css';

import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import Button from "~/component-system/Button/button";
import {Portal} from "react-portal";
import InputBox from "~/component-system/InputBox/InputBox";
import {useFormik} from "formik";
import {useRecoilState} from "recoil";
import {tagAtom} from "~/atom/tag.atom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_TAG_RELATION} from "~/cores/query";
import {HiPlusSm} from "react-icons/hi";
import classNames from "classnames";
import {UPSERT_TAG, UPSERT_POST} from "~/cores/mutation";
import produce from "immer";
import TagItem from "~/components/tagItem/tagItem";
import Scrollbars from 'react-custom-scrollbars';
import {useRouter} from "next/router";

interface Formik {
  content: string
  title: string
  desc: string
  open: boolean
  file: File | null
}

const TuiEditor = () => {
  const router = useRouter();

  const [nextStep, setNextStep] = useState<boolean>(false);
  const [showTagBox, setShowTagBox] = useState<boolean>(false);
  const [createTagName, setCreateTagName] = useState<string>("");
  const [tags, setTags] = useRecoilState(tagAtom);

  const [createTag, metadata] = useMutation(UPSERT_TAG);
  const [createPost, postMetaData] = useMutation(UPSERT_POST);
  const {data} = useQuery(GET_TAG_RELATION);

  const ref = useRef<any>(null);
  const tagIdsRef = useRef<number[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileBtn = useRef<HTMLInputElement>(null);


  const {values, resetForm, handleChange, handleSubmit, validateForm, setFieldValue} = useFormik<Formik>({
    initialValues: {
      content: "",
      title: "test",
      desc: "test",
      open: true,
      file: null
    },
    onSubmit: () => {
      createPost({
        variables: {
          data: {
            hashId: null,
            title: values.title,
            desc: values.desc,
            content: values.content,
            thumbnail: null,
            open: values.open,
            tagIds: tagIdsRef.current
          },
          file: values.file
        },
        errorPolicy: 'all',
      });

    },
  });


  useEffect(() => {
    if (postMetaData.loading) {
      router.push("/");
    }
  }, [postMetaData]);

  const handleChangeTagName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTagName(e.currentTarget.value);
  }, [createTagName]);

  const handleSubmitTagName = useCallback(() => {
    createTag(
      {
        variables: {data: {tagName: createTagName}},
        errorPolicy: 'all'
      });
  }, [createTagName]);


  const onClick = useCallback(() => {
    setFieldValue('content', ref.current.getInstance().preview.previewContent.innerHTML);
    setFieldValue('title', values.title);
    setFieldValue('desc', values.desc);

    setNextStep(!nextStep);
  }, [ref, nextStep]);

  const onClickFileBtn = useCallback(() => {
    if (!fileBtn.current) {
      return;
    }

    fileBtn.current.click();
  }, [fileBtn]);

  const onChangeFile = (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => {
    if (!e.target.files || !imageRef.current) {
      return;
    }
    const file: File = e.target.files[0];
    imageRef.current.src = URL.createObjectURL(file);
    setFieldValue("file", file);
  };

  const onChangeOpenState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("open", e.target.value === "true");
  };

  const onClickTag = (id: number) => {
    if (tagIdsRef.current.includes(id)) {
      const idx = tagIdsRef.current.indexOf(id);
      tagIdsRef.current.splice(idx, 1);
    } else {
      tagIdsRef.current.push(id);
    }
  };

  const renderTag = useMemo(() => {
    if (!tags) {
      return;
    }

    return tags.map((e) => {
      return (
        <TagItem
          tag={e}
          key={e.hashId}
          onClickTag={onClickTag}
        />
      );
    });
  }, [tags]);

  useEffect(() => {
    if (!tags || !metadata.data) {
      return;
    }

    const nextState = produce(tags, (draft) => {
      draft.push(metadata.data.upsertTag);
    });
    setTags(nextState);
    setShowTagBox(!showTagBox);

  }, [metadata.data]);


  useEffect(() => {
    if (!data) {
      return;
    }
    setTags(data.getTags);
  }, [data]);

  return (
    <div className={styles.editor}>
      <Editor
        initialValue="오늘도 글을 남기는 시간"
        previewStyle="vertical"
        height="92%"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={
          [colorSyntax, [codeSyntaxHighlight, {highlighter: Prism}]]
        }
        ref={ref}
      />
      <footer className={styles.footer}>
        <div>
          <Button onClick={onClick}>
            다음단계
          </Button>
        </div>
      </footer>
      {nextStep &&
      <Portal>
          <div className={styles.dimmer}/>
          <div className={styles.submitBox}>
              <section className={styles.left}>
                  <h1>썸네일</h1>
                  <div className={styles.thumbnail}>
                      <img ref={imageRef} alt="썸네일"/>
                  </div>
                  <div>
                      <Button className={styles.button} onClick={onClickFileBtn}>선택하기</Button>
                      <input type="file" ref={fileBtn} onChange={onChangeFile}/>
                  </div>
                  <div className={styles.postState}>
                      <h1>포스트 상태</h1>
                      <section>
                          <div>
                              <label htmlFor="open">공개</label>
                              <input type="radio" id="open" name="state" value="true" onChange={onChangeOpenState}
                                     checked={true}/>
                          </div>
                          <div>
                              <label htmlFor="close">비공개</label>
                              <input type="radio" id="close" name="state" value="false" onChange={onChangeOpenState}/>
                          </div>
                      </section>
                  </div>
              </section>
              <section className={styles.right}>
                  <h1>제목</h1>
                  <InputBox
                      name="title"
                      value={values.title}
                      type="text"
                      placeholder="타이틀"
                      handleChange={handleChange}
                      className={styles.titleInput}
                  />
                  <h2>부 제목</h2>
                  <InputBox
                      name="desc"
                      value={values.desc}
                      type="text"
                      placeholder="설먕"
                      handleChange={handleChange}
                      className={styles.titleInput}
                  />
                  <h2>태그</h2>
                  <Scrollbars style={{width: 360, height: 120}} className={styles.scrollBox}>
                      <div className={styles.tagBox}>
                        {renderTag}
                        {
                          !showTagBox &&
                          <span className={classNames(styles.tagItem, styles.plusBtn)}
                                onClick={() => {
                                  setShowTagBox(!showTagBox);
                                }}>
                            <HiPlusSm/>
                          </span>
                        }
                        {
                          showTagBox &&
                          <div className={styles.createTagInput}>
                              <input
                                  type="text"
                                  placeholder="태그이름"
                                  value={createTagName}
                                  onChange={(e) => {
                                    handleChangeTagName(e);
                                  }}/>
                              <span onClick={handleSubmitTagName}>
                                  <HiPlusSm/>
                                </span>
                          </div>
                        }
                      </div>
                  </Scrollbars>
                  <form onSubmit={handleSubmit}>
                      <div className={styles.submit}>
                          <Button className={styles.button}>게시하기</Button>
                      </div>
                  </form>
              </section>
          </div>
      </Portal>
      }
    </div>
  );
};

export default TuiEditor;