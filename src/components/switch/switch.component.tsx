import React, { FC } from "react";
import styles from "./switch.module.scss";
import { Props } from "./switch.types";

export const Switch: FC<Props> = ({ onChange, checked }) => {
  return (
    <>
      <input
        type="checkbox"
        id="switch"
        className={styles.checkbox}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor="switch" className={styles.slider} />
    </>
  );
};
