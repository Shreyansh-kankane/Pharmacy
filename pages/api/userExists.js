
import connectToDatabase from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ exists: true, user: existingUser });
    } else {
      return res.status(200).json({ exists: false,user: null });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
