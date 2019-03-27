/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api.config.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var config_v1_resources_pb = require('../../config/v1/resources_pb.js')

var commons_v1_resources_pb = require('../../commons/v1/resources_pb.js')

var google_api_annotations_pb = require('../../google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('../../protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = {};
proto.veidemann.api.config = {};
proto.veidemann.api.config.v1 = require('./config_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.config.v1.ConfigClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.config.v1.ConfigPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.ConfigRef,
 *   !proto.veidemann.api.config.v1.ConfigObject>}
 */
const methodInfo_Config_GetConfigObject = new grpc.web.AbstractClientBase.MethodInfo(
  config_v1_resources_pb.ConfigObject,
  /** @param {!proto.veidemann.api.config.v1.ConfigRef} request */
  function(request) {
    return request.serializeBinary();
  },
  config_v1_resources_pb.ConfigObject.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.ConfigRef} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.config.v1.ConfigObject)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.ConfigObject>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.getConfigObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/GetConfigObject',
      request,
      metadata || {},
      methodInfo_Config_GetConfigObject,
      callback);
};


/**
 * @param {!proto.veidemann.api.config.v1.ConfigRef} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.config.v1.ConfigObject>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.getConfigObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/GetConfigObject',
      request,
      metadata || {},
      methodInfo_Config_GetConfigObject);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.ListRequest,
 *   !proto.veidemann.api.config.v1.ConfigObject>}
 */
const methodInfo_Config_ListConfigObjects = new grpc.web.AbstractClientBase.MethodInfo(
  config_v1_resources_pb.ConfigObject,
  /** @param {!proto.veidemann.api.config.v1.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  config_v1_resources_pb.ConfigObject.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.ListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.ConfigObject>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.listConfigObjects =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.config.v1.Config/ListConfigObjects',
      request,
      metadata || {},
      methodInfo_Config_ListConfigObjects);
};


/**
 * @param {!proto.veidemann.api.config.v1.ListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.ConfigObject>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.listConfigObjects =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.config.v1.Config/ListConfigObjects',
      request,
      metadata || {},
      methodInfo_Config_ListConfigObjects);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.ListRequest,
 *   !proto.veidemann.api.config.v1.ListCountResponse>}
 */
const methodInfo_Config_CountConfigObjects = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.config.v1.ListCountResponse,
  /** @param {!proto.veidemann.api.config.v1.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.config.v1.ListCountResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.config.v1.ListCountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.ListCountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.countConfigObjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/CountConfigObjects',
      request,
      metadata || {},
      methodInfo_Config_CountConfigObjects,
      callback);
};


/**
 * @param {!proto.veidemann.api.config.v1.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.config.v1.ListCountResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.countConfigObjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/CountConfigObjects',
      request,
      metadata || {},
      methodInfo_Config_CountConfigObjects);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.ConfigObject,
 *   !proto.veidemann.api.config.v1.ConfigObject>}
 */
const methodInfo_Config_SaveConfigObject = new grpc.web.AbstractClientBase.MethodInfo(
  config_v1_resources_pb.ConfigObject,
  /** @param {!proto.veidemann.api.config.v1.ConfigObject} request */
  function(request) {
    return request.serializeBinary();
  },
  config_v1_resources_pb.ConfigObject.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.ConfigObject} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.config.v1.ConfigObject)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.ConfigObject>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.saveConfigObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/SaveConfigObject',
      request,
      metadata || {},
      methodInfo_Config_SaveConfigObject,
      callback);
};


/**
 * @param {!proto.veidemann.api.config.v1.ConfigObject} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.config.v1.ConfigObject>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.saveConfigObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/SaveConfigObject',
      request,
      metadata || {},
      methodInfo_Config_SaveConfigObject);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.UpdateRequest,
 *   !proto.veidemann.api.config.v1.UpdateResponse>}
 */
const methodInfo_Config_UpdateConfigObjects = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.config.v1.UpdateResponse,
  /** @param {!proto.veidemann.api.config.v1.UpdateRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.config.v1.UpdateResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.config.v1.UpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.UpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.updateConfigObjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/UpdateConfigObjects',
      request,
      metadata || {},
      methodInfo_Config_UpdateConfigObjects,
      callback);
};


/**
 * @param {!proto.veidemann.api.config.v1.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.config.v1.UpdateResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.updateConfigObjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/UpdateConfigObjects',
      request,
      metadata || {},
      methodInfo_Config_UpdateConfigObjects);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.ConfigObject,
 *   !proto.veidemann.api.config.v1.DeleteResponse>}
 */
const methodInfo_Config_DeleteConfigObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.config.v1.DeleteResponse,
  /** @param {!proto.veidemann.api.config.v1.ConfigObject} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.config.v1.DeleteResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.ConfigObject} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.config.v1.DeleteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.DeleteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.deleteConfigObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/DeleteConfigObject',
      request,
      metadata || {},
      methodInfo_Config_DeleteConfigObject,
      callback);
};


/**
 * @param {!proto.veidemann.api.config.v1.ConfigObject} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.config.v1.DeleteResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.deleteConfigObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/DeleteConfigObject',
      request,
      metadata || {},
      methodInfo_Config_DeleteConfigObject);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.config.v1.GetLabelKeysRequest,
 *   !proto.veidemann.api.config.v1.LabelKeysResponse>}
 */
const methodInfo_Config_GetLabelKeys = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.config.v1.LabelKeysResponse,
  /** @param {!proto.veidemann.api.config.v1.GetLabelKeysRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.config.v1.LabelKeysResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.config.v1.GetLabelKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.config.v1.LabelKeysResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.config.v1.LabelKeysResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.config.v1.ConfigClient.prototype.getLabelKeys =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/GetLabelKeys',
      request,
      metadata || {},
      methodInfo_Config_GetLabelKeys,
      callback);
};


/**
 * @param {!proto.veidemann.api.config.v1.GetLabelKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.config.v1.LabelKeysResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.config.v1.ConfigPromiseClient.prototype.getLabelKeys =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.config.v1.Config/GetLabelKeys',
      request,
      metadata || {},
      methodInfo_Config_GetLabelKeys);
};


module.exports = proto.veidemann.api.config.v1;

