import Image from "next/image";

export default function ListRow({
  title,
  subtitle,
  icon,
  onClick,
  showChevron = true
}) {
  return (
    <div
      className="ios-row"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {icon && (
        <Image
          src={`/icons/sf/${icon}.png`}
          width={22}
          height={22}
          alt="icon"
          style={{ marginRight: 12 }}
        />
      )}

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 17 }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: 13, color: "rgba(0,0,0,0.4)" }}>
            {subtitle}
          </div>
        )}
      </div>

      {showChevron && (
        <Image
          src="/icons/sf/chevron-right.png"
          width={18}
          height={18}
          alt="chevron"
        />
      )}
    </div>
  );
}
 
