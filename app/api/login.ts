import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { loginValidation } from '../lib/login_validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
    const { username, password } = req.body;

    const [isLogged, output] = await loginValidation(username, password);

    if (isLogged) {

      const cookies = new Cookies(req, res);
      cookies.set('userSession', 'admin', { httpOnly: true, maxAge: 3600 * 1000 });
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: output || 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
