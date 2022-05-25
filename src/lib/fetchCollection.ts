import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "src/lib/firebase";
import { ticketConverter } from "src/lib/firebase/converter";
import type { ReadTicket } from "src/type/ticket";

const firestore = getFirestore(app);

export const fetchCollection = async (url?: string) => {
  const collectionRef = collection(firestore, url ?? "ticket").withConverter(
    ticketConverter
  );
  const q = query(collectionRef, where("active", "==", true));
  const docDatas = await getDocs(q);

  const data = docDatas.docs.map((d) => {
    return d.data();
  });

  // DateTime型のデータをそのまま読み込もうとするとエラーが起こるっぽい
  // JSONにシリアライズ可能なデータ型のみを返す
  const posts: ReadTicket[] = JSON.parse(JSON.stringify(data));

  return posts;
};
