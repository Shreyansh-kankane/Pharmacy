
import Image from 'next/image'
import Link from 'next/link'
import { signIn,signOut,useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Layout({children}) {
  const {data: session} = useSession();
  const router = useRouter();

  return (
      <div className='w-[100vw]'>
        <Image className='w-full h-[50vh]' src={'/hioxindia-pharmacy_04.jpg'} height={1000} width={1000} alt='medical_shop' />

        <div className='w-[1/2] capitalize text-sky-700'>
            <ul className='w-full flex justify-around mt-[-30px]'>

              {
                session && session.user && session.user.role === 'admin' 
                && (
                  <>
                    <Link href={'/admin'}><li>Admin</li></Link>
                    <Link href={'/manage_user'}>manage_user</Link>
                  </>
                )
              }

              {
                session && session.user && session.user.role === 'distributor' 
                && (
                  <>
                    <Link href={'/Distributor'} className={`${router.pathname === '/Distributor' ? 'font-bold underline': '' }`} ><li >Home</li></Link>
                    <Link href={'/Distributor/stock'} className={`${router.pathname === '/Distributor/stock' ? 'font-bold underline': '' }`} >Your Stock</Link>
                    <Link href={'/Distributor/purchase'} className={`${router.pathname === '/Distributor/purchase' ? 'font-bold underline': '' }`} >Purchase medicine</Link>
                    <Link href={'/Distributor/sales'} className={`${router.pathname === '/Distributor/sales' ? 'font-bold underline': '' }`} >Sales</Link>
                    <Link href={'/Distributor/bills'} className={`${router.pathname === '/Distributor/bills' ? 'font-bold underline': '' }`} >Bills</Link>
                  </>
                )
              }

              {
                session && session.user && session.user.role === 'customer'
                && (
                  <>
                    <Link href={'/Customer'}><li>Home</li></Link>
                    <Link href={'/Customer/shop'}>Shop</Link>
                    <Link href={'/Customer/cart'}>Cart</Link>
                    <Link href={'/Customer/order'}>Order</Link>
                  </>
                )
              }

              {!session && (
                <>
                  <Link href={'/login'}><li>Login</li></Link>
                  <Link href={'/register'}>Register</Link>
                </>
              )}

              {session && session.user && <button className='text-white bg-sky-600 font-bold ' onClick={()=>signOut()}>Sign Out</button>}
              {/* {!session && <button onClick={()=>signIn()}>SignIn</button>} */}
            </ul>
        </div>
        
        <div className='main'>
            {children}
        </div>

        <div className='flex flex-wrap justify-center gap-5 mt-10 '>
          <div className='w-[30%]'>
            <Image className='w-[350px]' src={'/hioxindia-pharmacy_08.jpg'} height={200} width={1000} alt='Paracetamol'/>
          </div>
          <div className='w-[30%]'>
            <Image className='w-[350px]' src={'/hioxindia-pharmacy_10.jpg'} height={200} width={1000} alt='Aspirin'/>
          </div>
          <div className='w-[30%]'>
            <Image className='w-[350px]' src={'/hioxindia-pharmacy_12.jpg'} height={200} width={1000} alt='Cetrizine' />
          </div>
        </div>
      </div>
  )
}
