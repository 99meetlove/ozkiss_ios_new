export default function BubbleOutgoing({ text, time }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
      <div
        className="bubble-out"
        style={{ maxWidth: "72%" }}
      >
        {text}
      </div>
    </div>
  );
}
 
