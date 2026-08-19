import styles from './NoData.module.scss';

interface NoDataProps {
  text: string;
  icon: string;
}

export default function NoData({ text, icon }: NoDataProps) {
  return (
    <div className={styles['no-data']}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
