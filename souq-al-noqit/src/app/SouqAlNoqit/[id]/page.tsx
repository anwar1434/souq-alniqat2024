import F from "@/app/component/F";

async function SouqAlNoqit({ params }: { params: { id: string } }) {
  return <F id={params.id} />;
}

export default SouqAlNoqit;
