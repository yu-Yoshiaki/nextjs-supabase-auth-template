// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { Ticket } from "src/type/ticket";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURED_ID,
};

const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const ticketConverter: FirestoreDataConverter<Ticket> = {
  toFirestore(ticket: Ticket): DocumentData {
    // id は Firestore のパスで表現されるでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      updatedAt: serverTimestamp(),
      name: ticket.name,
      description: ticket.description,
      image: ticket.image,
      organizer: ticket.organizer,
      stock: ticket.stock,
      start: ticket.start,
      isAccept: ticket.isAccept,
      priceList: ticket.priceList,
      address: ticket.address,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Ticket {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      name: data.name,
      description: data.description,
      image: data.image,
      organizer: data.organizer,
      stock: data.stock,
      start: data.start,
      isAccept: data.isAccept,
      priceList: data.priceList,
      address: data.address,
      stripePriceId: data.stripePriceId,
    };
  },
};
