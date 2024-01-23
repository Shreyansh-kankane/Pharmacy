import getUser from "@/utils/getUser";

export default function ClientDetails() {
  const user = getUser();

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{user?.name}</h2>
        <p>{user.address}</p>
        <p>{user.phone}</p>
      </section>
    </>
  );
}
