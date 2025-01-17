import { Attribute, AttributeSDKType } from "../../base/v1beta1/attribute";
import * as _m0 from "protobufjs/minimal";
import { grpc } from "@improbable-eng/grpc-web";
import { DeepPartial } from "../../../helpers";
import { MsgSignProviderAttributes, MsgSignProviderAttributesSDKType, MsgSignProviderAttributesResponse, MsgSignProviderAttributesResponseSDKType, MsgDeleteProviderAttributes, MsgDeleteProviderAttributesSDKType, MsgDeleteProviderAttributesResponse, MsgDeleteProviderAttributesResponseSDKType } from "./audit";

/** Msg defines the provider Msg service */
export interface Msg {
  /** SignProviderAttributes defines a method that signs provider attributes */
  SignProviderAttributes(request: DeepPartial<MsgSignProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgSignProviderAttributesResponse>;

  /** DeleteProviderAttributes defines a method that deletes provider attributes */
  DeleteProviderAttributes(request: DeepPartial<MsgDeleteProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgDeleteProviderAttributesResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.signProviderAttributes = this.signProviderAttributes.bind(this);
    this.deleteProviderAttributes = this.deleteProviderAttributes.bind(this);
  }

  signProviderAttributes(request: DeepPartial<MsgSignProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgSignProviderAttributesResponse> {
    return this.rpc.unary(MsgSignProviderAttributes, MsgSignProviderAttributes.fromPartial(request), metadata);
  }

  deleteProviderAttributes(request: DeepPartial<MsgDeleteProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgDeleteProviderAttributesResponse> {
    return this.rpc.unary(MsgDeleteProviderAttributes, MsgDeleteProviderAttributes.fromPartial(request), metadata);
  }

}