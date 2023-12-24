import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState(null);


    const handleRegister = async (e) => {
        e.preventDefault();

        if ( !email || !password) {
            setError("All fields are necessary.");
            return;
        }
        try {
            const res = await fetch("/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                role
              }),
            });
      
            if (res.ok) {
              router.push("/Customer");
            } else {
                const data = await res.json();
                setError(data.error || "User registration failed.");
            }
          } catch (error) {
            console.log("Error during registration: ", error);
        }
    }
    return (
        <div className='flex flex-col items-center w-full'>

            <h1 className='text-2xl my-3'>Register</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}


            <form className='w-1/3 flex flex-col justify-between gap-1'>

                <div className='w-full flex justify-between'>
                  <label className=''>Email: </label>
                  <input className='border border-black w-2/3' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='w-full flex justify-between'>
                  <label className=''>Password: </label>
                  <input className='border border-black w-2/3' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='w-full flex justify-between'>
                  <label className=''>Phone no: </label>
                  <input className='border border-black w-2/3' type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className='w-full flex justify-between'> 
                  <label className=''>Address: </label>
                  <input className='border border-black w-2/3' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />  
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
                  <button onClick={handleRegister} className='p-2 w-1/4 border border-gray-700 bg-blue-500 text-white rounded-lg' >Register</button>
                </div>
                
                <div className='flex w-full justify-center'>
                  <p className='text-sm'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => router.push('/login')}>Login</span></p>
                </div>

            </form>
        </div>
    )
}