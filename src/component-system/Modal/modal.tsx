import React, {FC, memo, useMemo} from "react";
import styles from "./modal.module.scss";
import ModalItem from "~/component-system/ModalItem/ModalItem";
import Link from "next/link";
import classNames from "classnames";

interface Props {
  config: { name: string, href: string }[]
  className?: string
  click: boolean
}

const Modal: FC<Props> = memo(({config, click}) => {


  const renderPortal = useMemo(() => {
    return config.map((e, i) => {
      return (
        <Link href={e.href} key={e.href}>
          <a target={e.name === "프로필" ? "_blank" : ""}>
            <ModalItem
              item={e.name}
              border={i !== config.length - 1}
              key={e.name}
            >
              {e.name}
            </ModalItem>
          </a>
        </Link>
      );
    });
  }, [config]);

  return (
    <div className={classNames(styles.modal)}>
      {renderPortal}
    </div>
  );
});


export default Modal;
