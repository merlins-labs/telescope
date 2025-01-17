import { Grant, GrantSDKType } from "./authz";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import * as _m0 from "protobufjs/minimal";
import { grpc } from "@improbable-eng/grpc-web";
import { DeepPartial } from "../../../helpers";
import { MsgGrant, MsgGrantSDKType, MsgGrantResponse, MsgGrantResponseSDKType, MsgExec, MsgExecSDKType, MsgExecResponse, MsgExecResponseSDKType, MsgRevoke, MsgRevokeSDKType, MsgRevokeResponse, MsgRevokeResponseSDKType } from "./tx";

/** Msg defines the authz Msg service. */
export interface Msg {
  /**
   * Grant grants the provided authorization to the grantee on the granter's
   * account with the provided expiration time. If there is already a grant
   * for the given (granter, grantee, Authorization) triple, then the grant
   * will be overwritten.
   */
  Grant(request: DeepPartial<MsgGrant>, metadata?: grpc.Metadata): Promise<MsgGrantResponse>;

  /**
   * Exec attempts to execute the provided messages using
   * authorizations granted to the grantee. Each message should have only
   * one signer corresponding to the granter of the authorization.
   */
  Exec(request: DeepPartial<MsgExec>, metadata?: grpc.Metadata): Promise<MsgExecResponse>;

  /**
   * Revoke revokes any authorization corresponding to the provided method name on the
   * granter's account that has been granted to the grantee.
   */
  Revoke(request: DeepPartial<MsgRevoke>, metadata?: grpc.Metadata): Promise<MsgRevokeResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.grant = this.grant.bind(this);
    this.exec = this.exec.bind(this);
    this.revoke = this.revoke.bind(this);
  }

  grant(request: DeepPartial<MsgGrant>, metadata?: grpc.Metadata): Promise<MsgGrantResponse> {
    return this.rpc.unary(MsgGrant, MsgGrant.fromPartial(request), metadata);
  }

  exec(request: DeepPartial<MsgExec>, metadata?: grpc.Metadata): Promise<MsgExecResponse> {
    return this.rpc.unary(MsgExec, MsgExec.fromPartial(request), metadata);
  }

  revoke(request: DeepPartial<MsgRevoke>, metadata?: grpc.Metadata): Promise<MsgRevokeResponse> {
    return this.rpc.unary(MsgRevoke, MsgRevoke.fromPartial(request), metadata);
  }

}