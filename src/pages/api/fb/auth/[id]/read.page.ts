import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "src/lib/firebaseAdmin";

const readUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "POST") {
    try {
      const userData = await auth.getUser(id as string);

      res.status(200).json({ id: userData.uid });
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default readUser;
