import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import type { ReadTicket, Ticket } from "src/type/ticket";

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
