// source: report/v1/resources.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var frontier_v1_resources_pb = require('../../frontier/v1/resources_pb.js');
goog.object.extend(proto, frontier_v1_resources_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
goog.exportSymbol('proto.veidemann.api.report.v1.StatusDetail', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.veidemann.api.report.v1.StatusDetail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.veidemann.api.report.v1.StatusDetail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.veidemann.api.report.v1.StatusDetail.displayName = 'proto.veidemann.api.report.v1.StatusDetail';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.toObject = function(opt_includeInstance) {
  return proto.veidemann.api.report.v1.StatusDetail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.veidemann.api.report.v1.StatusDetail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.veidemann.api.report.v1.StatusDetail.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    state: jspb.Message.getFieldWithDefault(msg, 2, 0),
    jobid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    seed: jspb.Message.getFieldWithDefault(msg, 4, ""),
    startTime: (f = msg.getStartTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    endTime: (f = msg.getEndTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    documentsCrawled: jspb.Message.getFieldWithDefault(msg, 7, 0),
    bytesCrawled: jspb.Message.getFieldWithDefault(msg, 8, 0),
    urisCrawled: jspb.Message.getFieldWithDefault(msg, 9, 0),
    documentsFailed: jspb.Message.getFieldWithDefault(msg, 10, 0),
    documentsOutOfScope: jspb.Message.getFieldWithDefault(msg, 11, 0),
    documentsRetried: jspb.Message.getFieldWithDefault(msg, 12, 0),
    documentsDenied: jspb.Message.getFieldWithDefault(msg, 13, 0),
    queueSize: jspb.Message.getFieldWithDefault(msg, 14, 0),
    currentUri: jspb.Message.getFieldWithDefault(msg, 20, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.veidemann.api.report.v1.StatusDetail}
 */
proto.veidemann.api.report.v1.StatusDetail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.veidemann.api.report.v1.StatusDetail;
  return proto.veidemann.api.report.v1.StatusDetail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.veidemann.api.report.v1.StatusDetail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.veidemann.api.report.v1.StatusDetail}
 */
proto.veidemann.api.report.v1.StatusDetail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {!proto.veidemann.api.frontier.v1.CrawlExecutionStatus.State} */ (reader.readEnum());
      msg.setState(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setJobid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSeed(value);
      break;
    case 5:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setStartTime(value);
      break;
    case 6:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setEndTime(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDocumentsCrawled(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBytesCrawled(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setUrisCrawled(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDocumentsFailed(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDocumentsOutOfScope(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDocumentsRetried(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDocumentsDenied(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setQueueSize(value);
      break;
    case 20:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrentUri(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.veidemann.api.report.v1.StatusDetail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.veidemann.api.report.v1.StatusDetail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.veidemann.api.report.v1.StatusDetail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getState();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getJobid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSeed();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getStartTime();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getEndTime();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getDocumentsCrawled();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getBytesCrawled();
  if (f !== 0) {
    writer.writeInt64(
      8,
      f
    );
  }
  f = message.getUrisCrawled();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getDocumentsFailed();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getDocumentsOutOfScope();
  if (f !== 0) {
    writer.writeInt64(
      11,
      f
    );
  }
  f = message.getDocumentsRetried();
  if (f !== 0) {
    writer.writeInt64(
      12,
      f
    );
  }
  f = message.getDocumentsDenied();
  if (f !== 0) {
    writer.writeInt64(
      13,
      f
    );
  }
  f = message.getQueueSize();
  if (f !== 0) {
    writer.writeInt64(
      14,
      f
    );
  }
  f = message.getCurrentUri();
  if (f.length > 0) {
    writer.writeString(
      20,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional veidemann.api.frontier.v1.CrawlExecutionStatus.State state = 2;
 * @return {!proto.veidemann.api.frontier.v1.CrawlExecutionStatus.State}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getState = function() {
  return /** @type {!proto.veidemann.api.frontier.v1.CrawlExecutionStatus.State} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.veidemann.api.frontier.v1.CrawlExecutionStatus.State} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setState = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string jobId = 3;
 * @return {string}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getJobid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setJobid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string seed = 4;
 * @return {string}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getSeed = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setSeed = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional google.protobuf.Timestamp start_time = 5;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getStartTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
*/
proto.veidemann.api.report.v1.StatusDetail.prototype.setStartTime = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.clearStartTime = function() {
  return this.setStartTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.hasStartTime = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.Timestamp end_time = 6;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getEndTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 6));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
*/
proto.veidemann.api.report.v1.StatusDetail.prototype.setEndTime = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.clearEndTime = function() {
  return this.setEndTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.hasEndTime = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional int64 documents_crawled = 7;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getDocumentsCrawled = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setDocumentsCrawled = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 bytes_crawled = 8;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getBytesCrawled = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setBytesCrawled = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 uris_crawled = 9;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getUrisCrawled = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setUrisCrawled = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int64 documents_failed = 10;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getDocumentsFailed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setDocumentsFailed = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int64 documents_out_of_scope = 11;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getDocumentsOutOfScope = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setDocumentsOutOfScope = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional int64 documents_retried = 12;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getDocumentsRetried = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setDocumentsRetried = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional int64 documents_denied = 13;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getDocumentsDenied = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setDocumentsDenied = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};


/**
 * optional int64 queue_size = 14;
 * @return {number}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getQueueSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setQueueSize = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional string current_uri = 20;
 * @return {string}
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.getCurrentUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 20, ""));
};


/**
 * @param {string} value
 * @return {!proto.veidemann.api.report.v1.StatusDetail} returns this
 */
proto.veidemann.api.report.v1.StatusDetail.prototype.setCurrentUri = function(value) {
  return jspb.Message.setProto3StringField(this, 20, value);
};


goog.object.extend(exports, proto.veidemann.api.report.v1);
