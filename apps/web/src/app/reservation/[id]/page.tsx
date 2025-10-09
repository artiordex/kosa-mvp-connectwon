export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function ReservationIdPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Reservation ID: {params.id}</h1>
    </div>
  );
}
