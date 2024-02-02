import type { InjectionToken } from "tsyringe";

export const SERVER: InjectionToken<Server> = Symbol("Server");

export type Server = Readonly<{
  listen(): void;
}>;
