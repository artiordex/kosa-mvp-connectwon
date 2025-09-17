export default function RoomPage({ params }: { params: { id: string; roomId: string } }) {
  return (
    <div>
      <h1>
        Venue: {params.id} - Room: {params.roomId}
      </h1>
    </div>
  );
}
