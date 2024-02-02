import { z } from "zod";
import { brand, type Branded } from "../brand";

const ACCOUNT_ID: unique symbol = Symbol("AccountId");
export type AccountId = Branded<typeof ACCOUNT_ID, string>;

export const AccountId = {
  schema: z.string().transform<AccountId>((x) => brand(ACCOUNT_ID, x)),
};

export type Account = Readonly<{
  id: AccountId;
  address: string;
}>;
