import type { NotifyPopupProps } from '../../type/NotifyPopup';
import styles from './NotifyPopup.module.scss';

export default function NotifyPopup({
  message,
  onClose,
  icon = '⚠️',
}: NotifyPopupProps) {
  return (
    <div className={styles.mask}>
      <div className={styles['notify-popup']}>
        <div className={styles['notify-icon']}>{icon}</div>
        <h3 className={styles['notify-title']}>{message}</h3>
        <button className={styles['btn-primary']} onClick={onClose}>
          確定
        </button>
      </div>
    </div>
  );
}
