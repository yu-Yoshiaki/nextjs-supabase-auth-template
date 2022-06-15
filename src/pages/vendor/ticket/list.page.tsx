import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import type { CustomNextPage } from "next";
import Link from "next/link";
import { ProductDelete } from "src/component/Button/";
import { useUserStatus } from "src/hook/useUserStatus";
import { Layout } from "src/layout";
import { NotUser } from "src/layout/NotUser";
import { ticketConverter } from "src/lib/firebase/converter";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

const firestore = getFirestore();

const fetchDocs = async (fieldPath: string, value: string) => {
  const collectionRef = collection(firestore, "ticket").withConverter(
    ticketConverter
  );
  const q = query(
    collectionRef,
    where(fieldPath, "==", value),
    where("active", "==", true)
  );
  const data = await getDocs(q);
  const datas = data.docs.map((doc) => {
    return doc.data();
  });
  const posts = JSON.parse(JSON.stringify(datas));
  return posts;
};

const List: CustomNextPage = () => {
  const { user } = useUserStatus();

  const { data: list, error } = useSWR<ReadTicket[]>(
    user ? ["metadata.organizer", user.uid] : null,
    fetchDocs
  );

  if (!user) return <NotUser />;
  if (error) return <div>Failed to load</div>;
  if (!list) return <div>Loading...</div>;

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-xl text-center">作成したチケット一覧</h2>
        <ul className="px-3 w-full border-t">
          {list.map(({ name, description, id }) => {
            return (
              <div className="py-4 px-1 border-b" key={name}>
                <h3 className="text-xl truncate">{name}</h3>
                <p className="text-lg truncate">{description}</p>
                <div className="space-x-2">
                  <button className="text-sm text-blue-400">編集する</button>
                  <ProductDelete productId={id} />
                </div>
              </div>
            );
          })}
        </ul>

        <div className="flex justify-end px-6">
          <Link href={"/ticket/createNewTicket"}>
            <a className="flex justify-center items-center w-14 h-14 text-3xl text-white bg-blue-400 rounded-full shadow-xl">
              +
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

List.getLayout = Layout;

export default List;
