import connectToDatabase from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    
    const users = db.collection(role);

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = await users.insertOne({
      email,
      password, 
      role
    });

    return res.status(200).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
