import type { NotifyPopupProps } from '../../type/NotifyPopup';
import './NotifyPopup.scss';

export default function NotifyPopup({
  message,
  onClose,
  icon = '⚠️',
}: NotifyPopupProps) {
  return (
    <div className="mask">
      <div className="notify-popup">
        <div className="notify-icon">{icon}</div>
        <h3 className="notify-title">{message}</h3>
        <button className="btn-primary" onClick={onClose}>
          確定
        </button>
      </div>
    </div>
  );
}
