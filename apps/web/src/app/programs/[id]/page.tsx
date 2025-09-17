export default function ProgramsIdPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Program ID: {params.id}</h1>
    </div>
  );
}
