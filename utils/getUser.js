
import { useSession } from "next-auth/react";

export default function getUser() {
    const { data: session } = useSession();
    return session?.user;
}