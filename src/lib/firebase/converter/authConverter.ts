import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

type UserInfomation = {
  name: string;
  profile: string;
  image?: {
    src: string;
    alt: string;
  };
};

export const authConverter: FirestoreDataConverter<UserInfomation> = {
  toFirestore(userInfomation: UserInfomation): DocumentData {
    // id は Firestore のパスで表現されるでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      updatedAt: serverTimestamp(),
      name: userInfomation.name,
      profile: userInfomation.profile,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserInfomation {
    const data = snapshot.data(options);

    return {
      name: data.name,
      profile: data.profile,
      image: {
        src: data.image.src,
        alt: data.image.alt,
      },
    };
  },
};
