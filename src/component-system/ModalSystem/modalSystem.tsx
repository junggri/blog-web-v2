import React, {FC, memo} from "react";
import {Portal} from "react-portal";

interface Props {

}

const ModalSystem: FC<Props> = memo(({children}) => {
  return (
    <Portal>
      {children}
    </Portal>
  );
});

export default ModalSystem;
