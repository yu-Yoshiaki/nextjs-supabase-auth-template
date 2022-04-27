import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "src/lib/firebaseAdmin";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collectionRef = firestore.collection("ticket");
    const snapshot = await collectionRef.get();
    const docs = snapshot.docs.map((d) => {
      return d.id;
    });

    res.status(200).json(docs);
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default get;
