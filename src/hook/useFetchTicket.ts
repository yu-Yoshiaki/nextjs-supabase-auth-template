import { addDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { useCallback } from "react";
import { firestore, ticketConverter } from "src/lib/firebase";
import type { ReadTicket, WriteTicket } from "src/type/ticket";

export const useFetchTicket = () => {
  const createDoc = useCallback(async (ticket: WriteTicket) => {
    const collectionRef = collection(firestore, "ticket").withConverter(ticketConverter);

    await addDoc(collectionRef, ticket);
    window.alert(`Create Success!`);
    return;
  }, []);

  const updateDoc = useCallback(async (ticket: ReadTicket) => {
    const docRef = doc(firestore, "ticket", ticket.id);

    const review = await setDoc(docRef, ticket, { merge: true });
    window.alert(`Update Success! ,${review}`);
    return;
  }, []);

  return { createDoc, updateDoc };
};
