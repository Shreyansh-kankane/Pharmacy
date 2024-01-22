
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Customer() {
    const {data:session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(!session){
            router.push('/login');
        }
        console.log(session);
    },[]);

    return (
        <div className="font-bold text-center mt-4 text-4xl">
            Welcome {session?.user?.name}
        </div>
    );
}
