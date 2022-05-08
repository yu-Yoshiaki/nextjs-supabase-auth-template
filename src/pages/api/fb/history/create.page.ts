import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "src/lib/firebaseAdmin";

const history = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, productId, sessionId } = req.body;

  if (req.method === "POST") {
    try {
      const collectionRef = firestore
        .collection("history")
        .doc(email as string)
        .collection("sessions")
        .doc(sessionId as string);

      await collectionRef.set(
        {
          product: productId,
        },
        { merge: true }
      );

      res.status(200).json("success");
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
};

export default history;
