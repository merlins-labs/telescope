import { PoolParams, PoolParamsSDKType } from "./stableswap_pool";
import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import * as fm from "../../../../grpc-gateway";
import { MsgCreateStableswapPool, MsgCreateStableswapPoolSDKType, MsgCreateStableswapPoolResponse, MsgCreateStableswapPoolResponseSDKType, MsgStableSwapAdjustScalingFactors, MsgStableSwapAdjustScalingFactorsSDKType, MsgStableSwapAdjustScalingFactorsResponse, MsgStableSwapAdjustScalingFactorsResponseSDKType } from "./tx";
export class Msg {
  static CreateStableswapPool(request: MsgCreateStableswapPool, initRequest?: fm.InitReq): Promise<MsgCreateStableswapPoolResponse> {
    return fm.fetchReq(`/osmosis.gamm.poolmodels.stableswap.v1beta1/CreateStableswapPool`, { ...initRequest,
      method: "POST",
      body: JSON.stringify(request, fm.replacer)
    });
  }

  static StableSwapAdjustScalingFactors(request: MsgStableSwapAdjustScalingFactors, initRequest?: fm.InitReq): Promise<MsgStableSwapAdjustScalingFactorsResponse> {
    return fm.fetchReq(`/osmosis.gamm.poolmodels.stableswap.v1beta1/StableSwapAdjustScalingFactors`, { ...initRequest,
      method: "POST",
      body: JSON.stringify(request, fm.replacer)
    });
  }

}