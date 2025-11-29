export default function IOSButton({ title, onClick, style }) {
  return (
    <button
      className="ios-button"
      onClick={onClick}
      style={style}
    >
      {title}
    </button>
  );
}
 
