import NavBar from "../../component/NavBar";

export default async function SouqAlNoqitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <section className="w-full min-h-screen overflow-hidden">
      <NavBar id={params.id} />
      <div>{children}</div>
    </section>
  );
}
