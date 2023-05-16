import { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  handleClick(): void;
  disabled: boolean;
  children: ReactNode;
};

function Button({ handleClick, disabled = false, children }: Props) {
  return (
    <button
      onClick={handleClick}
      className={styles.button}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
