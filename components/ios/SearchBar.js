import Image from "next/image";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="ios-search">
      <Image
        src="/icons/sf/search.png"
        width={18}
        height={18}
        alt="search"
        style={{ opacity: 0.6 }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          outline: "none",
          fontSize: 16
        }}
      />
    </div>
  );
}
 
