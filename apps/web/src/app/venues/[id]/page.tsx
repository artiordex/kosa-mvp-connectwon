export default function VenuesIdPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Venue ID: {params.id}</h1>
    </div>
  );
}
