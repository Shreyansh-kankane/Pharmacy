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
    <div>Distributor</div>
  )
}

export default Distributor