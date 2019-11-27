import * as jspb from "google-protobuf"

export class Error extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMsg(): string;
  setMsg(value: string): void;

  getDetail(): string;
  setDetail(value: string): void;

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
  setPathsList(value: Array<string>): void;
  clearPathsList(): void;
  addPaths(value: string, index?: number): void;

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

export class ExtractedText extends jspb.Message {
  getWarcId(): string;
  setWarcId(value: string): void;

  getText(): string;
  setText(value: string): void;

  getSentenceCount(): number;
  setSentenceCount(value: number): void;

  getWordCount(): number;
  setWordCount(value: number): void;

  getLongWordCount(): number;
  setLongWordCount(value: number): void;

  getCharacterCount(): number;
  setCharacterCount(value: number): void;

  getLix(): number;
  setLix(value: number): void;

  getLanguage(): string;
  setLanguage(value: string): void;

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

