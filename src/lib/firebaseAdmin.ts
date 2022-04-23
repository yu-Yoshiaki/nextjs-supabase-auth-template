import type { ServiceAccount } from "firebase-admin";
import * as admin from "firebase-admin";

const cert: ServiceAccount = {
  privateKey: process.env.FIREBASE_KEY?.replace(/\\n/g, "\n"),
  projectId: process.env.FIREBASE_PROJECTID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
//初期化が複数発生し、エラーになるため、分岐で回避
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
}
