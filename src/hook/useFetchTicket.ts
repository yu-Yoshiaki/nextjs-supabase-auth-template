import { addDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { useCallback } from "react";
import { firestore, ticketConverter } from "src/lib/firebase";
import type { Ticket } from "src/type/ticket";

// fetchCollection
// fetchDoc
// createDoc
// updateDoc
// deleteDoc

export const useFetchTicket = () => {
  //   const [ticketDatas, setTicketDatas] = useState([]);
  //   // const [ticketData, setTicketData] = useState({});

  //   const fetchCol = useCallback(async () => {
  //     const data = await fetchCollection();
  //     if (data.docDatas) {
  //       setTicketDatas(data.docDatas.docs);
  //     }
  //     return;
  //   }, []);

  //   const fetchCollection = useCallback(async () => {
  //     const collectionRef = collection(firestore, "ticket").withConverter(ticketConverter);
  //     const docDatas = await getDocs(collectionRef);

  //     if (docDatas) {
  //       setTicketDatas(docDatas?.docs);
  //     }
  //     return;
  //   }, []);

  //   const fetchDoc = useCallback(async ({ docId = "9qgaLCjVivunspzg07tf" }) => {
  //   const docRef = doc(firestore, "ticket", docId);
  //   const docData = await getDoc(docRef);

  //   if (docData.exists()) {
  //     console.log("fetchDoc", docData);
  //   }

  //   return;
  // }, []);

  const createDoc = useCallback(async (ticket) => {
    const collectionRef = collection(firestore, "ticket").withConverter(ticketConverter);

    await addDoc(collectionRef, ticket);
    window.alert(`Create Success!`);
    return;
  }, []);

  const updateDoc = useCallback(async (ticket: Ticket) => {
    const docRef = doc(firestore, "ticket", ticket.id);

    const review = await setDoc(docRef, ticket, { merge: true });
    window.alert(`Update Success! ,${review}`);
    return;
  }, []);

  return { createDoc, updateDoc };
};
