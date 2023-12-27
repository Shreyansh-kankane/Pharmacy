import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Distributor() {
  const {data:session} = useSession();
  const router = useRouter();

    useEffect(()=>{
        if(!session){
            router.push('/login');
        }
    },[]);

  return (
    <div className="text-3xl text-center mt-4">Welcome to your medical store</div>  
  )
}

export default Distributor