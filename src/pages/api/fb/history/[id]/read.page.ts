import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "src/lib/firebaseAdmin";

const history = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const collectionRef = firestore
        .collection("history")
        .doc(id as string)
        .collection("sessions");

      const snapshot = await collectionRef.get();
      const history: string[] = snapshot.docs.map((doc) => {
        return doc.data().id;
      });

      res.status(200).json(history);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
};

export default history;
