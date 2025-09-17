export default function ReservationPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Reservation ID: {params.id}</h1>
    </div>
  );
}
