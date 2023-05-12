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
  selectedOptionLabel?: Option["label"];
  handleChange(option: string): void;
};
function checkHasSelectedOption(x: unknown): x is string {
  return typeof x === "string";
}

function SelectField({
  options,
  label,
  name,
  id,
  handleChange,
  selectedOptionLabel,
}: Props): JSX.Element {
  const hasSelectedOption = checkHasSelectedOption(selectedOptionLabel);

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
          return handleChange(targetValue);
        }}
      >
        {options.map((option: Option) => {
          const isSelected =
            hasSelectedOption && option.label === selectedOptionLabel;

          return (
            <option
              key={id ? `${id}-${option.label}` : option.label}
              value={option.value}
              selected={isSelected}
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
