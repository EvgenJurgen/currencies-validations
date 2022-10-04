import React, { FC } from "react";
import { Props } from "./input.types";
import "./input.module.scss";

export const Input: FC<Props> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
