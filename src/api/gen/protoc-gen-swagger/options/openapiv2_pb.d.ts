import * as jspb from "google-protobuf"

import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';

export class Swagger extends jspb.Message {
  getSwagger(): string;
  setSwagger(value: string): void;

  getInfo(): Info | undefined;
  setInfo(value?: Info): void;
  hasInfo(): boolean;
  clearInfo(): void;

  getHost(): string;
  setHost(value: string): void;

  getBasePath(): string;
  setBasePath(value: string): void;

  getSchemesList(): Array<Swagger.SwaggerScheme>;
  setSchemesList(value: Array<Swagger.SwaggerScheme>): void;
  clearSchemesList(): void;
  addSchemes(value: Swagger.SwaggerScheme, index?: number): void;

  getConsumesList(): Array<string>;
  setConsumesList(value: Array<string>): void;
  clearConsumesList(): void;
  addConsumes(value: string, index?: number): void;

  getProducesList(): Array<string>;
  setProducesList(value: Array<string>): void;
  clearProducesList(): void;
  addProduces(value: string, index?: number): void;

  getSecurityDefinitions(): SecurityDefinitions | undefined;
  setSecurityDefinitions(value?: SecurityDefinitions): void;
  hasSecurityDefinitions(): boolean;
  clearSecurityDefinitions(): void;

  getSecurityList(): Array<SecurityRequirement>;
  setSecurityList(value: Array<SecurityRequirement>): void;
  clearSecurityList(): void;
  addSecurity(value?: SecurityRequirement, index?: number): SecurityRequirement;

  getExternalDocs(): ExternalDocumentation | undefined;
  setExternalDocs(value?: ExternalDocumentation): void;
  hasExternalDocs(): boolean;
  clearExternalDocs(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Swagger.AsObject;
  static toObject(includeInstance: boolean, msg: Swagger): Swagger.AsObject;
  static serializeBinaryToWriter(message: Swagger, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Swagger;
  static deserializeBinaryFromReader(message: Swagger, reader: jspb.BinaryReader): Swagger;
}

export namespace Swagger {
  export type AsObject = {
    swagger: string,
    info?: Info.AsObject,
    host: string,
    basePath: string,
    schemesList: Array<Swagger.SwaggerScheme>,
    consumesList: Array<string>,
    producesList: Array<string>,
    securityDefinitions?: SecurityDefinitions.AsObject,
    securityList: Array<SecurityRequirement.AsObject>,
    externalDocs?: ExternalDocumentation.AsObject,
  }

  export enum SwaggerScheme { 
    UNKNOWN = 0,
    HTTP = 1,
    HTTPS = 2,
    WS = 3,
    WSS = 4,
  }
}

export class Operation extends jspb.Message {
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  clearTagsList(): void;
  addTags(value: string, index?: number): void;

  getSummary(): string;
  setSummary(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getExternalDocs(): ExternalDocumentation | undefined;
  setExternalDocs(value?: ExternalDocumentation): void;
  hasExternalDocs(): boolean;
  clearExternalDocs(): void;

  getOperationId(): string;
  setOperationId(value: string): void;

  getConsumesList(): Array<string>;
  setConsumesList(value: Array<string>): void;
  clearConsumesList(): void;
  addConsumes(value: string, index?: number): void;

  getProducesList(): Array<string>;
  setProducesList(value: Array<string>): void;
  clearProducesList(): void;
  addProduces(value: string, index?: number): void;

  getSchemesList(): Array<string>;
  setSchemesList(value: Array<string>): void;
  clearSchemesList(): void;
  addSchemes(value: string, index?: number): void;

  getDeprecated(): boolean;
  setDeprecated(value: boolean): void;

  getSecurityList(): Array<SecurityRequirement>;
  setSecurityList(value: Array<SecurityRequirement>): void;
  clearSecurityList(): void;
  addSecurity(value?: SecurityRequirement, index?: number): SecurityRequirement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Operation.AsObject;
  static toObject(includeInstance: boolean, msg: Operation): Operation.AsObject;
  static serializeBinaryToWriter(message: Operation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Operation;
  static deserializeBinaryFromReader(message: Operation, reader: jspb.BinaryReader): Operation;
}

export namespace Operation {
  export type AsObject = {
    tagsList: Array<string>,
    summary: string,
    description: string,
    externalDocs?: ExternalDocumentation.AsObject,
    operationId: string,
    consumesList: Array<string>,
    producesList: Array<string>,
    schemesList: Array<string>,
    deprecated: boolean,
    securityList: Array<SecurityRequirement.AsObject>,
  }
}

export class Info extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getTermsOfService(): string;
  setTermsOfService(value: string): void;

  getContact(): Contact | undefined;
  setContact(value?: Contact): void;
  hasContact(): boolean;
  clearContact(): void;

  getVersion(): string;
  setVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Info.AsObject;
  static toObject(includeInstance: boolean, msg: Info): Info.AsObject;
  static serializeBinaryToWriter(message: Info, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Info;
  static deserializeBinaryFromReader(message: Info, reader: jspb.BinaryReader): Info;
}

export namespace Info {
  export type AsObject = {
    title: string,
    description: string,
    termsOfService: string,
    contact?: Contact.AsObject,
    version: string,
  }
}

export class Contact extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Contact.AsObject;
  static toObject(includeInstance: boolean, msg: Contact): Contact.AsObject;
  static serializeBinaryToWriter(message: Contact, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Contact;
  static deserializeBinaryFromReader(message: Contact, reader: jspb.BinaryReader): Contact;
}

export namespace Contact {
  export type AsObject = {
    name: string,
    url: string,
    email: string,
  }
}

export class ExternalDocumentation extends jspb.Message {
  getDescription(): string;
  setDescription(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExternalDocumentation.AsObject;
  static toObject(includeInstance: boolean, msg: ExternalDocumentation): ExternalDocumentation.AsObject;
  static serializeBinaryToWriter(message: ExternalDocumentation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExternalDocumentation;
  static deserializeBinaryFromReader(message: ExternalDocumentation, reader: jspb.BinaryReader): ExternalDocumentation;
}

export namespace ExternalDocumentation {
  export type AsObject = {
    description: string,
    url: string,
  }
}

export class Schema extends jspb.Message {
  getJsonSchema(): JSONSchema | undefined;
  setJsonSchema(value?: JSONSchema): void;
  hasJsonSchema(): boolean;
  clearJsonSchema(): void;

  getDiscriminator(): string;
  setDiscriminator(value: string): void;

  getReadOnly(): boolean;
  setReadOnly(value: boolean): void;

  getExternalDocs(): ExternalDocumentation | undefined;
  setExternalDocs(value?: ExternalDocumentation): void;
  hasExternalDocs(): boolean;
  clearExternalDocs(): void;

  getExample(): google_protobuf_any_pb.Any | undefined;
  setExample(value?: google_protobuf_any_pb.Any): void;
  hasExample(): boolean;
  clearExample(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Schema.AsObject;
  static toObject(includeInstance: boolean, msg: Schema): Schema.AsObject;
  static serializeBinaryToWriter(message: Schema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Schema;
  static deserializeBinaryFromReader(message: Schema, reader: jspb.BinaryReader): Schema;
}

export namespace Schema {
  export type AsObject = {
    jsonSchema?: JSONSchema.AsObject,
    discriminator: string,
    readOnly: boolean,
    externalDocs?: ExternalDocumentation.AsObject,
    example?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class JSONSchema extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getDefault(): string;
  setDefault(value: string): void;

  getMultipleOf(): number;
  setMultipleOf(value: number): void;

  getMaximum(): number;
  setMaximum(value: number): void;

  getExclusiveMaximum(): boolean;
  setExclusiveMaximum(value: boolean): void;

  getMinimum(): number;
  setMinimum(value: number): void;

  getExclusiveMinimum(): boolean;
  setExclusiveMinimum(value: boolean): void;

  getMaxLength(): number;
  setMaxLength(value: number): void;

  getMinLength(): number;
  setMinLength(value: number): void;

  getPattern(): string;
  setPattern(value: string): void;

  getMaxItems(): number;
  setMaxItems(value: number): void;

  getMinItems(): number;
  setMinItems(value: number): void;

  getUniqueItems(): boolean;
  setUniqueItems(value: boolean): void;

  getMaxProperties(): number;
  setMaxProperties(value: number): void;

  getMinProperties(): number;
  setMinProperties(value: number): void;

  getRequiredList(): Array<string>;
  setRequiredList(value: Array<string>): void;
  clearRequiredList(): void;
  addRequired(value: string, index?: number): void;

  getArrayList(): Array<string>;
  setArrayList(value: Array<string>): void;
  clearArrayList(): void;
  addArray(value: string, index?: number): void;

  getTypeList(): Array<JSONSchema.JSONSchemaSimpleTypes>;
  setTypeList(value: Array<JSONSchema.JSONSchemaSimpleTypes>): void;
  clearTypeList(): void;
  addType(value: JSONSchema.JSONSchemaSimpleTypes, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JSONSchema.AsObject;
  static toObject(includeInstance: boolean, msg: JSONSchema): JSONSchema.AsObject;
  static serializeBinaryToWriter(message: JSONSchema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JSONSchema;
  static deserializeBinaryFromReader(message: JSONSchema, reader: jspb.BinaryReader): JSONSchema;
}

export namespace JSONSchema {
  export type AsObject = {
    title: string,
    description: string,
    pb_default: string,
    multipleOf: number,
    maximum: number,
    exclusiveMaximum: boolean,
    minimum: number,
    exclusiveMinimum: boolean,
    maxLength: number,
    minLength: number,
    pattern: string,
    maxItems: number,
    minItems: number,
    uniqueItems: boolean,
    maxProperties: number,
    minProperties: number,
    requiredList: Array<string>,
    arrayList: Array<string>,
    typeList: Array<JSONSchema.JSONSchemaSimpleTypes>,
  }

  export enum JSONSchemaSimpleTypes { 
    UNKNOWN = 0,
    ARRAY = 1,
    BOOLEAN = 2,
    INTEGER = 3,
    NULL = 4,
    NUMBER = 5,
    OBJECT = 6,
    STRING = 7,
  }
}

export class Tag extends jspb.Message {
  getDescription(): string;
  setDescription(value: string): void;

  getExternalDocs(): ExternalDocumentation | undefined;
  setExternalDocs(value?: ExternalDocumentation): void;
  hasExternalDocs(): boolean;
  clearExternalDocs(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tag.AsObject;
  static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
  static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tag;
  static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
  export type AsObject = {
    description: string,
    externalDocs?: ExternalDocumentation.AsObject,
  }
}

export class SecurityDefinitions extends jspb.Message {
  getSecurityMap(): jspb.Map<string, SecurityScheme>;
  clearSecurityMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SecurityDefinitions.AsObject;
  static toObject(includeInstance: boolean, msg: SecurityDefinitions): SecurityDefinitions.AsObject;
  static serializeBinaryToWriter(message: SecurityDefinitions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SecurityDefinitions;
  static deserializeBinaryFromReader(message: SecurityDefinitions, reader: jspb.BinaryReader): SecurityDefinitions;
}

export namespace SecurityDefinitions {
  export type AsObject = {
    securityMap: Array<[string, SecurityScheme.AsObject]>,
  }
}

export class SecurityScheme extends jspb.Message {
  getType(): SecurityScheme.Type;
  setType(value: SecurityScheme.Type): void;

  getDescription(): string;
  setDescription(value: string): void;

  getName(): string;
  setName(value: string): void;

  getIn(): SecurityScheme.In;
  setIn(value: SecurityScheme.In): void;

  getFlow(): SecurityScheme.Flow;
  setFlow(value: SecurityScheme.Flow): void;

  getAuthorizationUrl(): string;
  setAuthorizationUrl(value: string): void;

  getTokenUrl(): string;
  setTokenUrl(value: string): void;

  getScopes(): Scopes | undefined;
  setScopes(value?: Scopes): void;
  hasScopes(): boolean;
  clearScopes(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SecurityScheme.AsObject;
  static toObject(includeInstance: boolean, msg: SecurityScheme): SecurityScheme.AsObject;
  static serializeBinaryToWriter(message: SecurityScheme, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SecurityScheme;
  static deserializeBinaryFromReader(message: SecurityScheme, reader: jspb.BinaryReader): SecurityScheme;
}

export namespace SecurityScheme {
  export type AsObject = {
    type: SecurityScheme.Type,
    description: string,
    name: string,
    pb_in: SecurityScheme.In,
    flow: SecurityScheme.Flow,
    authorizationUrl: string,
    tokenUrl: string,
    scopes?: Scopes.AsObject,
  }

  export enum Type { 
    TYPE_INVALID = 0,
    TYPE_BASIC = 1,
    TYPE_API_KEY = 2,
    TYPE_OAUTH2 = 3,
  }

  export enum In { 
    IN_INVALID = 0,
    IN_QUERY = 1,
    IN_HEADER = 2,
  }

  export enum Flow { 
    FLOW_INVALID = 0,
    FLOW_IMPLICIT = 1,
    FLOW_PASSWORD = 2,
    FLOW_APPLICATION = 3,
    FLOW_ACCESS_CODE = 4,
  }
}

export class SecurityRequirement extends jspb.Message {
  getSecurityRequirementMap(): jspb.Map<string, SecurityRequirement.SecurityRequirementValue>;
  clearSecurityRequirementMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SecurityRequirement.AsObject;
  static toObject(includeInstance: boolean, msg: SecurityRequirement): SecurityRequirement.AsObject;
  static serializeBinaryToWriter(message: SecurityRequirement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SecurityRequirement;
  static deserializeBinaryFromReader(message: SecurityRequirement, reader: jspb.BinaryReader): SecurityRequirement;
}

export namespace SecurityRequirement {
  export type AsObject = {
    securityRequirementMap: Array<[string, SecurityRequirement.SecurityRequirementValue.AsObject]>,
  }

  export class SecurityRequirementValue extends jspb.Message {
    getScopeList(): Array<string>;
    setScopeList(value: Array<string>): void;
    clearScopeList(): void;
    addScope(value: string, index?: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SecurityRequirementValue.AsObject;
    static toObject(includeInstance: boolean, msg: SecurityRequirementValue): SecurityRequirementValue.AsObject;
    static serializeBinaryToWriter(message: SecurityRequirementValue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SecurityRequirementValue;
    static deserializeBinaryFromReader(message: SecurityRequirementValue, reader: jspb.BinaryReader): SecurityRequirementValue;
  }

  export namespace SecurityRequirementValue {
    export type AsObject = {
      scopeList: Array<string>,
    }
  }

}

export class Scopes extends jspb.Message {
  getScopeMap(): jspb.Map<string, string>;
  clearScopeMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Scopes.AsObject;
  static toObject(includeInstance: boolean, msg: Scopes): Scopes.AsObject;
  static serializeBinaryToWriter(message: Scopes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Scopes;
  static deserializeBinaryFromReader(message: Scopes, reader: jspb.BinaryReader): Scopes;
}

export namespace Scopes {
  export type AsObject = {
    scopeMap: Array<[string, string]>,
  }
}

