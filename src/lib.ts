import "reflect-metadata";

import { container } from "tsyringe";
import { SERVER } from "./server/server";

export function libMain(): void {
  const server = container.resolve(SERVER);

  server.listen();
}
