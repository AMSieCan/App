import { loginUser, createUser, me } from '../app/user';

export default {
  me: async (req, res) => {
    try {
      // Check header for authorization
      if (req.headers.authorization && req.headers.authorization.includes('Bearer ')) {
        const accessToken = req.headers.authorization.replace('Bearer ', '');
        const userData = await me(accessToken);
        if (userData) {
          return res.send(userData);
        }
      }

      throw new Error('User not found.');
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  signUp: async (req, res) => {
    try {
      // Validate email and password
      const { emailAddress, password } = req.body;
      if (!emailAddress) {
        return res.status(400).send({ message: 'Email address is not valid' });
      }
      if (!password) {
        return res.status(400).send({ message: 'Password is not valid' });
      }

      // Validate user
      const token = await createUser(emailAddress.toLowerCase(), password);

      res.send(token);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      // Validate email and password
      const { emailAddress, password } = req.body;
      if (!emailAddress) {
        return res.status(400).send({ message: 'Email address is not valid' });
      }
      if (!password) {
        return res.status(400).send({ message: 'Password is not valid' });
      }

      // Validate user
      const token = await loginUser(emailAddress.toLowerCase(), password);

      res.send(token);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  patch: async (req, res) => {
    try {
      
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
