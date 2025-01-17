import defu from 'defu';


import {
  ModuleRegistryService,
} from '@buf/dot_moar.connectrpc_es/moarpb/v1/moar_connect.js';
import {
  Client,
  createClient as createConnectClient,
  Interceptor,
  Transport,
} from '@connectrpc/connect';
import {
  ConnectTransportOptions,
  createConnectTransport,
} from '@connectrpc/connect-node';

export * from "@connectrpc/connect";
export * from "@buf/dot_moar.bufbuild_es/moarpb/v1/moar_pb.js";
export * from "@buf/dot_moar.connectrpc_es/moarpb/v1/moar_connect.js";

const auther: (accessToken: string) => Interceptor =
  (accessToken: string) => (next) => (req) => {
    if (!req.header.has("authorization")) {
      req.header.set("authorization", `Bearer ${accessToken}`);
    }
    return next(req);
  };

export type ClientOptions = {
  accessToken?: string;
} & Omit<ConnectTransportOptions, "httpVersion">;

const defaults: ClientOptions = {
  baseUrl: "http://localhost:8000",
  interceptors: [],
};

export const createClient = (
  transport: Transport
): Client<typeof ModuleRegistryService> =>
  createConnectClient(ModuleRegistryService, transport);

export const createMoarClient = (
  opts: ClientOptions
): Client<typeof ModuleRegistryService> => {
  const { accessToken, ...rest } = defu(opts, defaults);
  if (accessToken) {
    if (!rest.interceptors) {
      rest.interceptors = [auther(accessToken)];
    } else {
      rest.interceptors.push(auther(accessToken));
    }
  }
  // @ts-ignore -- defaults are hard
  const transport = createConnectTransport({
    ...rest,
    httpVersion: "2",
  });

  return createClient(transport);
};

export default function moarClient() {
  return createMoarClient({
    accessToken: import.meta.env.MOAR_API_KEY,
    baseUrl: import.meta.env.MOAR_ADDR,
  });
}