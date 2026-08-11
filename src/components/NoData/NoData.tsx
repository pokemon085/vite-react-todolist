import './noData.scss';

interface NoDataProps {
  text: string;
  icon: string;
}

export default function NoData({ text, icon }: NoDataProps) {
  return (
    <div className="no-data">
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </div>
  );
}
