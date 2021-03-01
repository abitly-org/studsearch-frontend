import React from "react";
import { IInput } from '../../interfaces'


export default function Input(props: IInput): JSX.Element {
  const { name, type, error, inputClass, placeholder, typing } = props;

  return (
    <input
      name={name}
      type={type}
      className={inputClass}
      placeholder={placeholder}
      onChange={typing}
    ></input>
  );
}
