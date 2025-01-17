import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { ContractInfo, ContractInfoSDKType, ContractCodeHistoryEntry, ContractCodeHistoryEntrySDKType, Model, ModelSDKType } from "./types";
import { Rpc } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query";
import { useQuery } from "@tanstack/react-query";
import { QueryContractInfoRequest, QueryContractInfoRequestSDKType, QueryContractInfoResponse, QueryContractInfoResponseSDKType, QueryContractHistoryRequest, QueryContractHistoryRequestSDKType, QueryContractHistoryResponse, QueryContractHistoryResponseSDKType, QueryContractsByCodeRequest, QueryContractsByCodeRequestSDKType, QueryContractsByCodeResponse, QueryContractsByCodeResponseSDKType, QueryAllContractStateRequest, QueryAllContractStateRequestSDKType, QueryAllContractStateResponse, QueryAllContractStateResponseSDKType, QueryRawContractStateRequest, QueryRawContractStateRequestSDKType, QueryRawContractStateResponse, QueryRawContractStateResponseSDKType, QuerySmartContractStateRequest, QuerySmartContractStateRequestSDKType, QuerySmartContractStateResponse, QuerySmartContractStateResponseSDKType, QueryCodeRequest, QueryCodeRequestSDKType, QueryCodeResponse, QueryCodeResponseSDKType, QueryCodesRequest, QueryCodesRequestSDKType, QueryCodesResponse, QueryCodesResponseSDKType, QueryPinnedCodesRequest, QueryPinnedCodesRequestSDKType, QueryPinnedCodesResponse, QueryPinnedCodesResponseSDKType } from "./query";

/** Query provides defines the gRPC querier service */
export interface Query {
  /** ContractInfo gets the contract meta data */
  contractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse>;

  /** ContractHistory gets the contract code history */
  contractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse>;

  /** ContractsByCode lists all smart contracts for a code id */
  contractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse>;

  /** AllContractState gets all raw store data for a single contract */
  allContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse>;

  /** RawContractState gets single key from the raw store data of a contract */
  rawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse>;

  /** SmartContractState get smart query result from the contract */
  smartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse>;

  /** Code gets the binary code and metadata for a singe wasm code */
  code(request: QueryCodeRequest): Promise<QueryCodeResponse>;

  /** Codes gets the metadata for all stored wasm codes */
  codes(request?: QueryCodesRequest): Promise<QueryCodesResponse>;

  /** PinnedCodes gets the pinned code ids */
  pinnedCodes(request?: QueryPinnedCodesRequest): Promise<QueryPinnedCodesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.contractInfo = this.contractInfo.bind(this);
    this.contractHistory = this.contractHistory.bind(this);
    this.contractsByCode = this.contractsByCode.bind(this);
    this.allContractState = this.allContractState.bind(this);
    this.rawContractState = this.rawContractState.bind(this);
    this.smartContractState = this.smartContractState.bind(this);
    this.code = this.code.bind(this);
    this.codes = this.codes.bind(this);
    this.pinnedCodes = this.pinnedCodes.bind(this);
  }

  contractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse> {
    const data = QueryContractInfoRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "ContractInfo", data);
    return promise.then(data => QueryContractInfoResponse.decode(new _m0.Reader(data)));
  }

  contractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse> {
    const data = QueryContractHistoryRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "ContractHistory", data);
    return promise.then(data => QueryContractHistoryResponse.decode(new _m0.Reader(data)));
  }

  contractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse> {
    const data = QueryContractsByCodeRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "ContractsByCode", data);
    return promise.then(data => QueryContractsByCodeResponse.decode(new _m0.Reader(data)));
  }

  allContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse> {
    const data = QueryAllContractStateRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "AllContractState", data);
    return promise.then(data => QueryAllContractStateResponse.decode(new _m0.Reader(data)));
  }

  rawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse> {
    const data = QueryRawContractStateRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "RawContractState", data);
    return promise.then(data => QueryRawContractStateResponse.decode(new _m0.Reader(data)));
  }

  smartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse> {
    const data = QuerySmartContractStateRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "SmartContractState", data);
    return promise.then(data => QuerySmartContractStateResponse.decode(new _m0.Reader(data)));
  }

  code(request: QueryCodeRequest): Promise<QueryCodeResponse> {
    const data = QueryCodeRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "Code", data);
    return promise.then(data => QueryCodeResponse.decode(new _m0.Reader(data)));
  }

  codes(request: QueryCodesRequest = {
    pagination: undefined
  }): Promise<QueryCodesResponse> {
    const data = QueryCodesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "Codes", data);
    return promise.then(data => QueryCodesResponse.decode(new _m0.Reader(data)));
  }

  pinnedCodes(request: QueryPinnedCodesRequest = {
    pagination: undefined
  }): Promise<QueryPinnedCodesResponse> {
    const data = QueryPinnedCodesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Query", "PinnedCodes", data);
    return promise.then(data => QueryPinnedCodesResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    contractInfo(request: QueryContractInfoRequest): Promise<QueryContractInfoResponse> {
      return queryService.contractInfo(request);
    },

    contractHistory(request: QueryContractHistoryRequest): Promise<QueryContractHistoryResponse> {
      return queryService.contractHistory(request);
    },

    contractsByCode(request: QueryContractsByCodeRequest): Promise<QueryContractsByCodeResponse> {
      return queryService.contractsByCode(request);
    },

    allContractState(request: QueryAllContractStateRequest): Promise<QueryAllContractStateResponse> {
      return queryService.allContractState(request);
    },

    rawContractState(request: QueryRawContractStateRequest): Promise<QueryRawContractStateResponse> {
      return queryService.rawContractState(request);
    },

    smartContractState(request: QuerySmartContractStateRequest): Promise<QuerySmartContractStateResponse> {
      return queryService.smartContractState(request);
    },

    code(request: QueryCodeRequest): Promise<QueryCodeResponse> {
      return queryService.code(request);
    },

    codes(request?: QueryCodesRequest): Promise<QueryCodesResponse> {
      return queryService.codes(request);
    },

    pinnedCodes(request?: QueryPinnedCodesRequest): Promise<QueryPinnedCodesResponse> {
      return queryService.pinnedCodes(request);
    }

  };
};
export interface UseContractInfoQuery<TData> extends ReactQueryParams<QueryContractInfoResponse, TData> {
  request: QueryContractInfoRequest;
}
export interface UseContractHistoryQuery<TData> extends ReactQueryParams<QueryContractHistoryResponse, TData> {
  request: QueryContractHistoryRequest;
}
export interface UseContractsByCodeQuery<TData> extends ReactQueryParams<QueryContractsByCodeResponse, TData> {
  request: QueryContractsByCodeRequest;
}
export interface UseAllContractStateQuery<TData> extends ReactQueryParams<QueryAllContractStateResponse, TData> {
  request: QueryAllContractStateRequest;
}
export interface UseRawContractStateQuery<TData> extends ReactQueryParams<QueryRawContractStateResponse, TData> {
  request: QueryRawContractStateRequest;
}
export interface UseSmartContractStateQuery<TData> extends ReactQueryParams<QuerySmartContractStateResponse, TData> {
  request: QuerySmartContractStateRequest;
}
export interface UseCodeQuery<TData> extends ReactQueryParams<QueryCodeResponse, TData> {
  request: QueryCodeRequest;
}
export interface UseCodesQuery<TData> extends ReactQueryParams<QueryCodesResponse, TData> {
  request?: QueryCodesRequest;
}
export interface UsePinnedCodesQuery<TData> extends ReactQueryParams<QueryPinnedCodesResponse, TData> {
  request?: QueryPinnedCodesRequest;
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

  const useContractInfo = <TData = QueryContractInfoResponse,>({
    request,
    options
  }: UseContractInfoQuery<TData>) => {
    return useQuery<QueryContractInfoResponse, Error, TData>(["contractInfoQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.contractInfo(request);
    }, options);
  };

  const useContractHistory = <TData = QueryContractHistoryResponse,>({
    request,
    options
  }: UseContractHistoryQuery<TData>) => {
    return useQuery<QueryContractHistoryResponse, Error, TData>(["contractHistoryQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.contractHistory(request);
    }, options);
  };

  const useContractsByCode = <TData = QueryContractsByCodeResponse,>({
    request,
    options
  }: UseContractsByCodeQuery<TData>) => {
    return useQuery<QueryContractsByCodeResponse, Error, TData>(["contractsByCodeQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.contractsByCode(request);
    }, options);
  };

  const useAllContractState = <TData = QueryAllContractStateResponse,>({
    request,
    options
  }: UseAllContractStateQuery<TData>) => {
    return useQuery<QueryAllContractStateResponse, Error, TData>(["allContractStateQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.allContractState(request);
    }, options);
  };

  const useRawContractState = <TData = QueryRawContractStateResponse,>({
    request,
    options
  }: UseRawContractStateQuery<TData>) => {
    return useQuery<QueryRawContractStateResponse, Error, TData>(["rawContractStateQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.rawContractState(request);
    }, options);
  };

  const useSmartContractState = <TData = QuerySmartContractStateResponse,>({
    request,
    options
  }: UseSmartContractStateQuery<TData>) => {
    return useQuery<QuerySmartContractStateResponse, Error, TData>(["smartContractStateQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.smartContractState(request);
    }, options);
  };

  const useCode = <TData = QueryCodeResponse,>({
    request,
    options
  }: UseCodeQuery<TData>) => {
    return useQuery<QueryCodeResponse, Error, TData>(["codeQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.code(request);
    }, options);
  };

  const useCodes = <TData = QueryCodesResponse,>({
    request,
    options
  }: UseCodesQuery<TData>) => {
    return useQuery<QueryCodesResponse, Error, TData>(["codesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.codes(request);
    }, options);
  };

  const usePinnedCodes = <TData = QueryPinnedCodesResponse,>({
    request,
    options
  }: UsePinnedCodesQuery<TData>) => {
    return useQuery<QueryPinnedCodesResponse, Error, TData>(["pinnedCodesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.pinnedCodes(request);
    }, options);
  };

  return {
    /** ContractInfo gets the contract meta data */
    useContractInfo,

    /** ContractHistory gets the contract code history */
    useContractHistory,

    /** ContractsByCode lists all smart contracts for a code id */
    useContractsByCode,

    /** AllContractState gets all raw store data for a single contract */
    useAllContractState,

    /** RawContractState gets single key from the raw store data of a contract */
    useRawContractState,

    /** SmartContractState get smart query result from the contract */
    useSmartContractState,

    /** Code gets the binary code and metadata for a singe wasm code */
    useCode,

    /** Codes gets the metadata for all stored wasm codes */
    useCodes,

    /** PinnedCodes gets the pinned code ids */
    usePinnedCodes
  };
};