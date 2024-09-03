import FetchOrder from "@/app/component/FetchOrder";


async function Order({ params }: { params: { id: string } }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-start mt-10">
      <FetchOrder id={params.id} />
    </div>
  );
}

export default Order;
