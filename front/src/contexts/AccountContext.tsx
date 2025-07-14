import { createContext, ReactNode, useState } from "react";

type AccountData = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  paymentMethod: string;
};

type AccountContextType = {
  data: AccountData;
  updateData: (newData: Partial<AccountData>) => void;
};

const defaultData: AccountData = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  paymentMethod: "Card",
};

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AccountData>(defaultData);

  const updateData = (newData: Partial<AccountData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <AccountContext.Provider value={{ data, updateData }}>
      {children}
    </AccountContext.Provider>
  );
};
