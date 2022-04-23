import "src/lib/firebaseAdmin";

import { getFirestore } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

const firestore = getFirestore();

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const collectionRef = firestore
      .collection("ticket")
      .doc(id as string)
      .collection("prices");

    const snapshot = await collectionRef.get();
    const prices = snapshot.docs.map((doc) => {
      return doc.data();
    });
    res.status(200).json(prices);
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default get;
