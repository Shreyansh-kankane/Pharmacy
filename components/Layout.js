
import Image from 'next/image'
import Link from 'next/link'
import { signIn,signOut,useSession } from 'next-auth/react'

export default function Layout({children}) {
  const {data: session} = useSession();
  return (
      <div className='w-[100vw]'>
        <Image className='w-full h-[50vh]' src={'/hioxindia-pharmacy_04.jpg'} height={1000} width={1000} />

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
                    <Link href={'/Distributor'}><li>Home</li></Link>
                    <Link href={'/store'}>Your store</Link>
                    <Link href={'/order'}>Order medicine</Link>
                    <Link href={'/sales'}>Sales</Link>
                    <Link href={'/bills'}>Bills</Link>
                  </>
                )
              }

              {
                session && session.user && session.user.role === 'customer'
                && (
                  <>
                    <Link href={'/Customer'}><li>Home</li></Link>
                    <Link href={'/purchase'}>Shop</Link>
                    <Link href={'/cart'}>Cart</Link>
                    <Link href={'/order'}>Order</Link>
                    <Link href={'/bills'}>Bills</Link>

                  </>
                )
              }

              {!session && (
                <>
                  <Link href={'/login'}><li>Login</li></Link>
                  <Link href={'/register'}>Register</Link>
                </>
              )}

              {session && session.user && <button onClick={()=>signOut()}>Sign Out</button>}
              {/* {!session && <button onClick={()=>signIn()}>SignIn</button>} */}
            </ul>
        </div>
        
        <div className='main'>
            {children}
        </div>

        <div className='flex flex-wrap justify-center gap-5 mt-10 '>
          <div className='w-[30%]'>
            <Image className='w-[350px]' src={'/hioxindia-pharmacy_08.jpg'} height={200} width={1000} />
          </div>
          <div className='w-[30%]'>
            <Image className='w-[350px]' src={'/hioxindia-pharmacy_10.jpg'} height={200} width={1000} />
          </div>
          <div className='w-[30%]'>
            <Image className='w-[350px]' src={'/hioxindia-pharmacy_12.jpg'} height={200} width={1000} />
          </div>
        </div>
      </div>
  )
}