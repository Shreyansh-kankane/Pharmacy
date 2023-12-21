import { getSession } from 'next-auth/react';

const authenticate = async (req, res, next) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.redirect('/login');
    }

    return next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authenticate;
