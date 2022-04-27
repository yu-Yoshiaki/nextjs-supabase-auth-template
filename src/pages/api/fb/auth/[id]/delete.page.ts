import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "src/lib/firebaseAdmin";

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "POST") {
    try {
      await auth.deleteUser(id as string);

      res.status(200).json("user delete Success.");
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default deleteUser;
