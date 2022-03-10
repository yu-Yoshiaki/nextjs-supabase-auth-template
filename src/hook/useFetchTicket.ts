import { addDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { useCallback } from "react";
import { firestore, ticketConverter } from "src/lib/firebase";
import type { CreateTicket, Ticket } from "src/type/ticket";

export const useFetchTicket = () => {
  const createDoc = useCallback(async (ticket: CreateTicket) => {
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
