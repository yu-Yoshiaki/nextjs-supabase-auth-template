export type Ticket = {
  id: string;
  name: string;
  description: string;
  image?: string;
  organizer: string;
  stock: number;
  start: object;
  isAccept: boolean;
  priceList: {
    nomal: {
      price: string;
      content: string;
    };
  };
  address: {
    address: string;
    postCode: string;
  };
  stripePriceId: string;
};
