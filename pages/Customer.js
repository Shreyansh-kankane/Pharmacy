
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
    },[]);

    return (
        <div className="">
            hii customer
        </div>
    );
}
