import * as _m0 from "protobufjs/minimal";
import { grpc } from "@improbable-eng/grpc-web";
import { DeepPartial } from "../../../helpers";
import { MsgUnjail, MsgUnjailSDKType, MsgUnjailResponse, MsgUnjailResponseSDKType } from "./tx";

/** Msg defines the slashing Msg service. */
export interface Msg {
  /**
   * Unjail defines a method for unjailing a jailed validator, thus returning
   * them into the bonded validator set, so they can begin receiving provisions
   * and rewards again.
   */
  Unjail(request: DeepPartial<MsgUnjail>, metadata?: grpc.Metadata): Promise<MsgUnjailResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.unjail = this.unjail.bind(this);
  }

  unjail(request: DeepPartial<MsgUnjail>, metadata?: grpc.Metadata): Promise<MsgUnjailResponse> {
    return this.rpc.unary(MsgUnjail, MsgUnjail.fromPartial(request), metadata);
  }

}