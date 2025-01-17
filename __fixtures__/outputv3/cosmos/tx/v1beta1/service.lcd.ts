import { Tx, TxSDKType } from "./tx";
import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../base/query/v1beta1/pagination";
import { TxResponse, TxResponseSDKType, GasInfo, GasInfoSDKType, Result, ResultSDKType } from "../../base/abci/v1beta1/abci";
import { BlockID, BlockIDSDKType } from "../../../tendermint/types/types";
import { Block, BlockSDKType } from "../../../tendermint/types/block";
import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@osmonauts/lcd";
import { SimulateRequest, SimulateRequestSDKType, SimulateResponse, SimulateResponseSDKType, GetTxRequest, GetTxRequestSDKType, GetTxResponse, GetTxResponseSDKType, BroadcastTxRequest, BroadcastTxRequestSDKType, BroadcastTxResponse, BroadcastTxResponseSDKType, GetTxsEventRequest, GetTxsEventRequestSDKType, GetTxsEventResponse, GetTxsEventResponseSDKType, GetBlockWithTxsRequest, GetBlockWithTxsRequestSDKType, GetBlockWithTxsResponse, GetBlockWithTxsResponseSDKType } from "./service";
export class LCDQueryClient {
  req: LCDClient;

  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.getTx = this.getTx.bind(this);
    this.getTxsEvent = this.getTxsEvent.bind(this);
    this.getBlockWithTxs = this.getBlockWithTxs.bind(this);
  }

  /* GetTx fetches a tx by hash. */
  async getTx(params: GetTxRequest): Promise<GetTxResponseSDKType> {
    const endpoint = `cosmos/tx/v1beta1/txs/${params.hash}`;
    return await this.req.get<GetTxResponseSDKType>(endpoint);
  }

  /* GetTxsEvent fetches txs by event. */
  async getTxsEvent(params: GetTxsEventRequest): Promise<GetTxsEventResponseSDKType> {
    const options: any = {
      params: {}
    };

    if (typeof params?.events !== "undefined") {
      options.params.events = params.events;
    }

    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }

    if (typeof params?.orderBy !== "undefined") {
      options.params.order_by = params.orderBy;
    }

    const endpoint = `cosmos/tx/v1beta1/txs`;
    return await this.req.get<GetTxsEventResponseSDKType>(endpoint, options);
  }

  /* GetBlockWithTxs fetches a block with decoded txs.
  
   Since: cosmos-sdk 0.45.2 */
  async getBlockWithTxs(params: GetBlockWithTxsRequest): Promise<GetBlockWithTxsResponseSDKType> {
    const options: any = {
      params: {}
    };

    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }

    const endpoint = `cosmos/tx/v1beta1/txs/block/${params.height}`;
    return await this.req.get<GetBlockWithTxsResponseSDKType>(endpoint, options);
  }

}