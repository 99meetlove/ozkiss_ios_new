export default function BubbleIncoming({ text, time }) {
  return (
    <div style={{ display: "flex", marginBottom: 6 }}>
      <div
        className="bubble-in"
        style={{ maxWidth: "72%" }}
      >
        {text}
      </div>
    </div>
  );
}
 
