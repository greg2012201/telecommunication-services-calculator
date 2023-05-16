import styles from "./Header.module.css";

type Props = {
  title: string;
  subtitle: string;
};

function Header({ title, subtitle }: Props) {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
