import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.scss";
import { Props } from "./form.types";

export const Form: FC<Props> = ({ onSubmit, values }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        {values.map((value) => (
          <>
            <label>{value.label}</label>
            <input
              {...register(value.name, {
                required: value.required,
              })}
            />
            {errors[value.name] && <p>This field is required</p>}
          </>
        ))}

        <input type="submit" />
      </form>
    </div>
  );
};
