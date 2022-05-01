import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import type { Price, ReadPrice } from "src/type/ticket";

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
