export default function ProgramEditPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Program: {params.id}</h1>
    </div>
  );
}
