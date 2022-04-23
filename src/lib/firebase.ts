// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { Price, ReadPrice, ReadTicket, Ticket } from "src/type/ticket";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE as string,
};

const app = initializeApp(firebaseConfig, "front");
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const ticketConverter: FirestoreDataConverter<Ticket> = {
  toFirestore(ticket: Ticket): DocumentData {
    // id は Firestore のパスで表現されるでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      updatedAt: serverTimestamp(),
      ...ticket,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<ReadTicket>,
    options: SnapshotOptions
  ): ReadTicket {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      name: data.name,
      description: data.description,
      active: data.active,
      metadata: data.metadata,
      images: data.images,
      role: data.role,
      taxCode: data.taxCode,
      updatedAt: data.updatedAt,
    };
  },
};

export const ticketPriceConverter: FirestoreDataConverter<Price> = {
  toFirestore(price: Price): DocumentData {
    // id は Firestore のパスで表現されるでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      updatedAt: serverTimestamp(),
      ...price,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<ReadPrice>,
    options: SnapshotOptions
  ): ReadPrice {
    const data = snapshot.data(options);

    return {
      id: data.id,
      active: data.active,
      billingScheme: data.billingScheme,
      currency: data.currency,
      metadata: data.metadata,
      product: data.product,
      recurring: data.recurring,
      taxBehavior: data.taxBehavior,
      tiersMode: data.tiersMode,
      transformQuantity: data.transformQuantity,
      type: data.type,
      unitAmount: data.unitAmount,
      updatedAt: data.updatedAt,
    };
  },
};
