import styles from './PropWrapper.module.css';

type PropWrapperProps = {
  label?: string;
  value: string;
  hasTitle?: boolean;
};

function PropWrapper({ label, value, hasTitle = false }: PropWrapperProps) {
  return (
    <div className={hasTitle ? styles['wrapper--title'] : styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <p>{value}</p>
    </div>
  );
}

export default PropWrapper;
