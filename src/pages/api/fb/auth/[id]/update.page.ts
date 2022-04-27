import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "src/lib/firebaseAdmin";

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const data: { email: string; password: string } = req.body;
  if (req.method === "POST") {
    try {
      const userData = await auth.updateUser(id as string, {
        ...data,
      });

      res
        .status(200)
        .json({ message: "user update success.", data: userData.toJSON() });
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default updateUser;
