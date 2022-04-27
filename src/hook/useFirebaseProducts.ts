import { getDoc, getDocs } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useCallback } from "react";
import { app, ticketConverter, ticketPriceConverter } from "src/lib/firebase";
import type { ReadTicket, Ticket } from "src/type/ticket";

const firestore = getFirestore(app);

export const useFirebaseProducts = () => {
  const createDoc = useCallback(async (ticket: Ticket, id: string) => {
    try {
      const collectionRef = collection(firestore, "ticket").withConverter(
        ticketConverter
      );
      const docRef = doc(collectionRef, id);
      await setDoc(docRef, ticket, { merge: true });
    } catch (e: any) {
      window.alert(e.message);
    }
    return;
  }, []);

  const addTicketSubCollection = useCallback(
    async (data, id: string, priceId: string) => {
      try {
        const collectionRef = collection(
          firestore,
          "ticket",
          id,
          "prices"
        ).withConverter(ticketPriceConverter);
        await setDoc(doc(collectionRef, priceId), data, { merge: true });
        window.alert(`update Success!`);
      } catch (e: any) {
        window.alert(e.message);
      }
      return;
    },
    []
  );

  const updateDoc = useCallback(async (ticket: Ticket, id: string) => {
    const docRef = doc(firestore, "ticket", id);

    const review = await setDoc(docRef, ticket, { merge: true });
    window.alert(`Update Success! ,${review}`);
    return;
  }, []);

  const readDoc = useCallback(async (ticket: ReadTicket) => {
    const docRef = doc(firestore, "ticket", ticket.id).withConverter(
      ticketConverter
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data;
    } else {
      // doc.data() will be undefined in this case
      window.alert("No such document!");
    }
  }, []);

  const readDocs = useCallback(async () => {
    const collectionRef = collection(firestore, "ticket").withConverter(
      ticketConverter
    );

    const docSnaps = await getDocs(collectionRef);
    return docSnaps;
  }, []);

  return { createDoc, updateDoc, addTicketSubCollection, readDoc, readDocs };
};
