import * as admin from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";

//初期化が複数発生し、エラーになるため、分岐で回避
if (admin.apps.length === 0) {
  initializeApp({
    credential: applicationDefault(),
  });
}
