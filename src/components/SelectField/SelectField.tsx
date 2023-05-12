import { useState } from "react";
import styles from "./SelectField.module.css";

type Value = string | number;

export type Option = {
  label: string;
  value: Value;
};

type Props = {
  options: Option[];
  label: string;
  name: string;
  id?: string;
  initialValue?: Value;
  handleChange(option: string): void;
};

function isInitialValue(x: unknown): x is Value {
  return typeof x === "string" || typeof x === "number";
}

function SelectField({
  options,
  label,
  name,
  id,
  handleChange,
  initialValue,
}: Props): JSX.Element {
  const hasInitialValue = isInitialValue(initialValue);
  const [value, setValue] = useState<Value>(
    hasInitialValue ? initialValue : options[0].value
  );
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        id={id || name}
        name={name}
        onChange={(e) => {
          const targetValue = e.target.value;
          setValue(targetValue);
          return handleChange(targetValue);
        }}
        value={value}
      >
        {options.map((option: Option) => {
          return (
            <option
              key={id ? `${id}-${option.label}` : option.label}
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectField;
