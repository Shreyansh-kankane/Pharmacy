import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function LoginPage() {

    const {data:session} = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState(null);

    const router = useRouter();
    
    if(session){
        if(session.user.role === 'supplier'){
            router.push('/Supplier');
        }
        else if(session.user.role === 'customer'){
            router.push('/Customer');
        }
        else if(session.user.role === 'distributor'){
            router.push('/Distributor');
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            role
        });
        if (result.error) {
            console.error('Authentication failed:', result.error);
            setError(result.error);   
        }
        else if(result.ok){
            if(role === 'supplier'){
                router.push('/Supplier');
            }
            else if(role === 'customer'){
                router.push('/Customer');
            }
            else if(role === 'distributor'){
                router.push('/Distributor');
            }
        }
    };

    return (
        <div className='flex flex-col items-center w-full'>

            <h1 className='text-2xl my-3'>Login</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form className='w-1/3 flex flex-col justify-between gap-1'>

                <div className='w-full flex justify-between'>
                <label className=''>Email: </label>
                <input className='border border-black w-2/3' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='w-full flex justify-between'>
                <label className=''>Password: </label>
                <input className='border border-black w-2/3' type="email" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <div className='w-full flex justify-between' > 
                    <label className=''>Role: </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className='border border-black' >
                        <option value="customer">Customer</option>
                        <option value="distributor">Distributor</option> 
                        <option value="supplier">Supplier</option> 
                    </select> 
                </div>


                <div className='flex w-full justify-center' >
                    <button onClick={handleSignIn} className='p-2 w-1/4 border border-gray-700 bg-blue-500 text-white rounded-lg' >Sign In</button>
                </div>

                <div className='flex w-full justify-center'>
                    <p className='text-sm'> Do not have account ? <span className='text-blue-500 cursor-pointer' onClick={() => router.push('/register')}>Register</span></p>
                </div>
            </form>

        </div>
    );
}
