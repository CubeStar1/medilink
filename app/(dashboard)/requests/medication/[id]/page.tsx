export default function CreateRequestPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Create Request for Medication: {params.id}</h1>
    </div>
  )
} 