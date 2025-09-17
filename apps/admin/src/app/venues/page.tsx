export default function VenueEditPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Venue: {params.id}</h1>
    </div>
  );
}
