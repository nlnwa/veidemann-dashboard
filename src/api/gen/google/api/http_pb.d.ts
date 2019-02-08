import * as jspb from "google-protobuf"

export class Http extends jspb.Message {
  constructor ();
  getRulesList(): HttpRule[] | undefined;
  setRulesList(value?: HttpRule[]): void;
  clearRulesList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Http.AsObject;
  static toObject(includeInstance: boolean, msg: Http): Http.AsObject;
  static serializeBinaryToWriter(message: Http, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Http;
  static deserializeBinaryFromReader(message: Http, reader: jspb.BinaryReader): Http;
}

export namespace Http {
  export type AsObject = {
    rulesList?: HttpRule.AsObject[];
  }
}

export class HttpRule extends jspb.Message {
  constructor ();
  getSelector(): string;
  setSelector(value: string): void;
  getGet(): string;
  setGet(value: string): void;
  getPut(): string;
  setPut(value: string): void;
  getPost(): string;
  setPost(value: string): void;
  getDelete(): string;
  setDelete(value: string): void;
  getPatch(): string;
  setPatch(value: string): void;
  getCustom(): CustomHttpPattern | undefined;
  setCustom(value?: CustomHttpPattern): void;
  clearCustom(): void;
  getBody(): string;
  setBody(value: string): void;
  getAdditionalBindingsList(): HttpRule[] | undefined;
  setAdditionalBindingsList(value?: HttpRule[]): void;
  clearAdditionalBindingsList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HttpRule.AsObject;
  static toObject(includeInstance: boolean, msg: HttpRule): HttpRule.AsObject;
  static serializeBinaryToWriter(message: HttpRule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HttpRule;
  static deserializeBinaryFromReader(message: HttpRule, reader: jspb.BinaryReader): HttpRule;
}

export namespace HttpRule {
  export type AsObject = {
    selector: string;
    get: string;
    put: string;
    post: string;
    delete: string;
    patch: string;
    custom?: CustomHttpPattern.AsObject;
    body: string;
    additionalBindingsList?: HttpRule.AsObject[];
  }
}

export class CustomHttpPattern extends jspb.Message {
  constructor ();
  getKind(): string;
  setKind(value: string): void;
  getPath(): string;
  setPath(value: string): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomHttpPattern.AsObject;
  static toObject(includeInstance: boolean, msg: CustomHttpPattern): CustomHttpPattern.AsObject;
  static serializeBinaryToWriter(message: CustomHttpPattern, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomHttpPattern;
  static deserializeBinaryFromReader(message: CustomHttpPattern, reader: jspb.BinaryReader): CustomHttpPattern;
}

export namespace CustomHttpPattern {
  export type AsObject = {
    kind: string;
    path: string;
  }
}

