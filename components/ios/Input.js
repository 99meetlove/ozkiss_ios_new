export default function IOSInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text"
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <div style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", marginBottom: 6 }}>
          {label}
        </div>
      )}

      <input
        type={type}
        className="ios-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
