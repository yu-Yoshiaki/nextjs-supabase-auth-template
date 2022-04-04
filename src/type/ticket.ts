export type ReadTicket = {
  id: string;
  name: string;
  description: string;
  image?: string;
  organizer: string;

  start: object;
  isAccept: boolean;
  priceList: {
    nomal: {
      price: string;
      content: string;
      stock: number;
    };
  };
  address?: {
    address?: string;
    postCode?: string;
    lat: number;
    lng: number;
  };
  stripePriceId: string;
};

export type WriteTicket = {
  name: string;
  description: string;
  image?: string;
  organizer: string;
  start: object;
  isAccept: boolean;
  priceList: {
    nomal: {
      price: string;
      content: string;
      stock: number;
    };
  };
  address?: {
    address?: string;
    postCode?: string;
    lat: number;
    lng: number;
  };
  stripePriceId: string;
};
