import { Timestamp, TimestampSDKType } from "../../../google/protobuf/timestamp";
import { Params, ParamsSDKType } from "./genesis";
import { Rpc } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query";
import { useQuery } from "@tanstack/react-query";
import { ParamsRequest, ParamsRequestSDKType, ParamsResponse, ParamsResponseSDKType, ArithmeticTwapRequest, ArithmeticTwapRequestSDKType, ArithmeticTwapResponse, ArithmeticTwapResponseSDKType, ArithmeticTwapToNowRequest, ArithmeticTwapToNowRequestSDKType, ArithmeticTwapToNowResponse, ArithmeticTwapToNowResponseSDKType } from "./query";
export interface Query {
  params(request?: ParamsRequest): Promise<ParamsResponse>;
  arithmeticTwap(request: ArithmeticTwapRequest): Promise<ArithmeticTwapResponse>;
  arithmeticTwapToNow(request: ArithmeticTwapToNowRequest): Promise<ArithmeticTwapToNowResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.arithmeticTwap = this.arithmeticTwap.bind(this);
    this.arithmeticTwapToNow = this.arithmeticTwapToNow.bind(this);
  }

  params(request: ParamsRequest = {}): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.twap.v1beta1.Query", "Params", data);
    return promise.then(data => ParamsResponse.decode(new _m0.Reader(data)));
  }

  arithmeticTwap(request: ArithmeticTwapRequest): Promise<ArithmeticTwapResponse> {
    const data = ArithmeticTwapRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.twap.v1beta1.Query", "ArithmeticTwap", data);
    return promise.then(data => ArithmeticTwapResponse.decode(new _m0.Reader(data)));
  }

  arithmeticTwapToNow(request: ArithmeticTwapToNowRequest): Promise<ArithmeticTwapToNowResponse> {
    const data = ArithmeticTwapToNowRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.twap.v1beta1.Query", "ArithmeticTwapToNow", data);
    return promise.then(data => ArithmeticTwapToNowResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: ParamsRequest): Promise<ParamsResponse> {
      return queryService.params(request);
    },

    arithmeticTwap(request: ArithmeticTwapRequest): Promise<ArithmeticTwapResponse> {
      return queryService.arithmeticTwap(request);
    },

    arithmeticTwapToNow(request: ArithmeticTwapToNowRequest): Promise<ArithmeticTwapToNowResponse> {
      return queryService.arithmeticTwapToNow(request);
    }

  };
};
export interface UseParamsQuery<TData> extends ReactQueryParams<ParamsResponse, TData> {
  request?: ParamsRequest;
}
export interface UseArithmeticTwapQuery<TData> extends ReactQueryParams<ArithmeticTwapResponse, TData> {
  request: ArithmeticTwapRequest;
}
export interface UseArithmeticTwapToNowQuery<TData> extends ReactQueryParams<ArithmeticTwapToNowResponse, TData> {
  request: ArithmeticTwapToNowRequest;
}

const _queryClients: WeakMap<ProtobufRpcClient, QueryClientImpl> = new WeakMap();

const getQueryService = (rpc: ProtobufRpcClient | undefined): QueryClientImpl | undefined => {
  if (!rpc) return;

  if (_queryClients.has(rpc)) {
    return _queryClients.get(rpc);
  }

  const queryService = new QueryClientImpl(rpc);

  _queryClients.set(rpc, queryService);

  return queryService;
};

export const createRpcQueryHooks = (rpc: ProtobufRpcClient | undefined) => {
  const queryService = getQueryService(rpc);

  const useParams = <TData = ParamsResponse,>({
    request,
    options
  }: UseParamsQuery<TData>) => {
    return useQuery<ParamsResponse, Error, TData>(["paramsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.params(request);
    }, options);
  };

  const useArithmeticTwap = <TData = ArithmeticTwapResponse,>({
    request,
    options
  }: UseArithmeticTwapQuery<TData>) => {
    return useQuery<ArithmeticTwapResponse, Error, TData>(["arithmeticTwapQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.arithmeticTwap(request);
    }, options);
  };

  const useArithmeticTwapToNow = <TData = ArithmeticTwapToNowResponse,>({
    request,
    options
  }: UseArithmeticTwapToNowQuery<TData>) => {
    return useQuery<ArithmeticTwapToNowResponse, Error, TData>(["arithmeticTwapToNowQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.arithmeticTwapToNow(request);
    }, options);
  };

  return {
    useParams,
    useArithmeticTwap,
    useArithmeticTwapToNow
  };
};