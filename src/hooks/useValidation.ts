import {Formik} from "~/components/replyInputBox/replyInputBox";

export function UseValidation(values: Formik) {
  return Object.values(values).some(e => e.length === 0)
}