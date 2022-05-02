import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import type { CustomNextPage } from "next";
import Link from "next/link";
import { useAuth } from "src/hook/useAuth";
import { Layout } from "src/layout";
import { ticketConverter } from "src/lib/firebase";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

const firestore = getFirestore();

const fetchDocs = async (fieldPath: string, value: string) => {
  const collectionRef = collection(firestore, "ticket").withConverter(
    ticketConverter
  );
  const q = query(collectionRef, where(fieldPath, "==", value));
  const data = await getDocs(q);
  const datas = data.docs.map((doc) => {
    return doc.data();
  });
  const posts = JSON.parse(JSON.stringify(datas));
  return posts;
};

const List: CustomNextPage = () => {
  const { user } = useAuth();
  const { data: list, error } = useSWR<ReadTicket[]>(
    user ? ["metadata.organizer", user] : null,
    fetchDocs
  );

  if (error) return <div>failed to load</div>;
  if (!list) return <div>Loading...</div>;

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-xl text-center">作成したチケット一覧</h2>
        <ul className="px-3 w-full border-t">
          {list.map(({ name, description }) => {
            return (
              <div className="py-4 px-1 border-b" key={name}>
                <h3 className="text-xl truncate">{name}</h3>
                <p className="text-lg truncate">{description}</p>
                <div className="space-x-2">
                  <button className="text-sm text-blue">編集する</button>
                  <button className="text-sm text-blue">削除する</button>
                </div>
              </div>
            );
          })}
        </ul>
        <div>
          <Link href={"/ticket/create"}>
            <a className="py-2 px-4 text-white bg-blue">チケット作成</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

List.getLayout = Layout;

export default List;
