import * as jspb from 'google-protobuf'



export class Error extends jspb.Message {
  getCode(): number;
  setCode(value: number): Error;

  getMsg(): string;
  setMsg(value: string): Error;

  getDetail(): string;
  setDetail(value: string): Error;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    code: number,
    msg: string,
    detail: string,
  }
}

export class FieldMask extends jspb.Message {
  getPathsList(): Array<string>;
  setPathsList(value: Array<string>): FieldMask;
  clearPathsList(): FieldMask;
  addPaths(value: string, index?: number): FieldMask;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FieldMask.AsObject;
  static toObject(includeInstance: boolean, msg: FieldMask): FieldMask.AsObject;
  static serializeBinaryToWriter(message: FieldMask, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FieldMask;
  static deserializeBinaryFromReader(message: FieldMask, reader: jspb.BinaryReader): FieldMask;
}

export namespace FieldMask {
  export type AsObject = {
    pathsList: Array<string>,
  }
}

export class ParsedUri extends jspb.Message {
  getHref(): string;
  setHref(value: string): ParsedUri;

  getScheme(): string;
  setScheme(value: string): ParsedUri;

  getHost(): string;
  setHost(value: string): ParsedUri;

  getPort(): number;
  setPort(value: number): ParsedUri;

  getUsername(): string;
  setUsername(value: string): ParsedUri;

  getPassword(): string;
  setPassword(value: string): ParsedUri;

  getPath(): string;
  setPath(value: string): ParsedUri;

  getQuery(): string;
  setQuery(value: string): ParsedUri;

  getFragment(): string;
  setFragment(value: string): ParsedUri;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParsedUri.AsObject;
  static toObject(includeInstance: boolean, msg: ParsedUri): ParsedUri.AsObject;
  static serializeBinaryToWriter(message: ParsedUri, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParsedUri;
  static deserializeBinaryFromReader(message: ParsedUri, reader: jspb.BinaryReader): ParsedUri;
}

export namespace ParsedUri {
  export type AsObject = {
    href: string,
    scheme: string,
    host: string,
    port: number,
    username: string,
    password: string,
    path: string,
    query: string,
    fragment: string,
  }
}

export class ExtractedText extends jspb.Message {
  getWarcId(): string;
  setWarcId(value: string): ExtractedText;

  getText(): string;
  setText(value: string): ExtractedText;

  getSentenceCount(): number;
  setSentenceCount(value: number): ExtractedText;

  getWordCount(): number;
  setWordCount(value: number): ExtractedText;

  getLongWordCount(): number;
  setLongWordCount(value: number): ExtractedText;

  getCharacterCount(): number;
  setCharacterCount(value: number): ExtractedText;

  getLix(): number;
  setLix(value: number): ExtractedText;

  getLanguage(): string;
  setLanguage(value: string): ExtractedText;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractedText.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractedText): ExtractedText.AsObject;
  static serializeBinaryToWriter(message: ExtractedText, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractedText;
  static deserializeBinaryFromReader(message: ExtractedText, reader: jspb.BinaryReader): ExtractedText;
}

export namespace ExtractedText {
  export type AsObject = {
    warcId: string,
    text: string,
    sentenceCount: number,
    wordCount: number,
    longWordCount: number,
    characterCount: number,
    lix: number,
    language: string,
  }
}

