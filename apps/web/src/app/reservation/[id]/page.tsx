export default function ReservationIdPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Reservation ID: {params.id}</h1>
    </div>
  );
}
