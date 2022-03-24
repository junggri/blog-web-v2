import {IFormik} from "~/components/Header/header";

enum keyType {
  name = "name",
  email = "email",
  phoneNumber = "phoneNumber"
}

type mapType = { [key in keyType]: string }

export default function UseValidationInput(values: IFormik) {

  const valueHashTable: mapType = {
    name: "",
    email: "",
    phoneNumber: ""
  }

  for (const value in values) {
    if (!value) {
      return
    }
  }

}