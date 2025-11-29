import NavigationBar from "@/components/ios/NavigationBar";
import GroupSection from "@/components/ios/GroupSection";
import ListRow from "@/components/ios/ListRow";

export default function HistoryPage() {
  const history = [
    { host: "Samantha", date: "Nov 26, 8:00 PM", price: "$480" },
    { host: "Jenny", date: "Nov 23, 6:00 PM", price: "$260" },
  ];

  return (
    <>
      <NavigationBar title="Booking History" small={true} />

      <GroupSection>
        {history.map((item, idx) => (
          <ListRow
            key={idx}
            title={item.host}
            subtitle={`${item.date} · ${item.price}`}
            icon="clock"
          />
        ))}
      </GroupSection>
    </>
  );
}
 
