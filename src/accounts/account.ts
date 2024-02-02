import { z } from "zod";
import { brand, type Branded } from "../brand";
import { Address } from "../address/address";

const ACCOUNT_ID: unique symbol = Symbol("AccountId");
export type AccountId = Branded<typeof ACCOUNT_ID, string>;

export const AccountId = {
  schema: z.string().transform<AccountId>((x) => brand(ACCOUNT_ID, x)),
};

export type Account = Readonly<{
  id: AccountId;
  address: Address;
}>;

export const Account = {
  schema: z
    .object({
      id: AccountId.schema,
      address: Address.schema,
    })
    .transform<Account>((x) => x),
};
