import styles from "./SelectField.module.css";

export type Option = {
  label: string;
  value: string | number;
};

type Props = {
  options: Option[];
  label: string;
  name: string;
  id?: string;
};

function SelectField({ options, label, name, id }: Props): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select id={id || name} name={name}>
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
