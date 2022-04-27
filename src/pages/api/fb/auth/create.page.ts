import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "src/lib/firebaseAdmin";

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  if (req.method === "POST") {
    try {
      const userData = await auth.createUser({
        email,
        password,
      });

      res.status(200).json({ id: userData.uid });
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createUser;
