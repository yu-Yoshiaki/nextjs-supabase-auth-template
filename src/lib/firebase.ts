// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { ReadTicket, WriteTicket } from "src/type/ticket";

const firebaseConfig = {
  apiKey: "AIzaSyBM5DDEXXjKg1qNt917WjszGExxJ9aby9Y",
  authDomain: "ticketia-b34da.firebaseapp.com",
  projectId: "ticketia-b34da",
  storageBucket: "ticketia-b34da.appspot.com",
  messagingSenderId: "565523945662",
  appId: "1:565523945662:web:ae46673a67f857751d66ef",
  measurementId: "G-BRLLR77RF8",
};

const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const ticketConverter: FirestoreDataConverter<WriteTicket> = {
  toFirestore(ticket: WriteTicket): DocumentData {
    // id は Firestore のパスで表現されるでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      updatedAt: serverTimestamp(),
      name: ticket.name,
      description: ticket.description,
      organizer: ticket.organizer,
      start: ticket.start,
      isAccept: ticket.isAccept,
      priceList: ticket.priceList,
      stripePriceId: ticket.stripePriceId,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ReadTicket {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      name: data.name,
      description: data.description,
      image: data.image,
      organizer: data.organizer,
      start: data.start,
      isAccept: data.isAccept,
      priceList: data.priceList,
      address: data.address,
      stripePriceId: data.stripePriceId,
    };
  },
};
