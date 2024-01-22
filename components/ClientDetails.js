import { useSession } from "next-auth/react";

export default function ClientDetails() {
    const {data:session} = useSession();
    console.log(session);

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{session?.user?.name}</h2>
        <p>{session?.user.address}</p>
      </section>
    </>
  );
}
