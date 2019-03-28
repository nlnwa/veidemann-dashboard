/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api.eventhandler.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var eventhandler_v1_resources_pb = require('../../eventhandler/v1/resources_pb.js')

var commons_v1_resources_pb = require('../../commons/v1/resources_pb.js')

var google_api_annotations_pb = require('../../google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('../../protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = {};
proto.veidemann.api.eventhandler = {};
proto.veidemann.api.eventhandler.v1 = require('./eventhandler_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient =
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
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient =
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
 *   !proto.veidemann.api.eventhandler.v1.EventRef,
 *   !proto.veidemann.api.eventhandler.v1.EventObject>}
 */
const methodInfo_EventHandler_GetEventObject = new grpc.web.AbstractClientBase.MethodInfo(
  eventhandler_v1_resources_pb.EventObject,
  /** @param {!proto.veidemann.api.eventhandler.v1.EventRef} request */
  function(request) {
    return request.serializeBinary();
  },
  eventhandler_v1_resources_pb.EventObject.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.EventRef} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.eventhandler.v1.EventObject)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.EventObject>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.getEventObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/GetEventObject',
      request,
      metadata || {},
      methodInfo_EventHandler_GetEventObject,
      callback);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.EventRef} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.eventhandler.v1.EventObject>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.getEventObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/GetEventObject',
      request,
      metadata || {},
      methodInfo_EventHandler_GetEventObject);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.eventhandler.v1.ListRequest,
 *   !proto.veidemann.api.eventhandler.v1.EventObject>}
 */
const methodInfo_EventHandler_ListEventObjects = new grpc.web.AbstractClientBase.MethodInfo(
  eventhandler_v1_resources_pb.EventObject,
  /** @param {!proto.veidemann.api.eventhandler.v1.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  eventhandler_v1_resources_pb.EventObject.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.ListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.EventObject>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.listEventObjects =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/ListEventObjects',
      request,
      metadata || {},
      methodInfo_EventHandler_ListEventObjects);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.ListRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.EventObject>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.listEventObjects =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/ListEventObjects',
      request,
      metadata || {},
      methodInfo_EventHandler_ListEventObjects);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.eventhandler.v1.ListRequest,
 *   !proto.veidemann.api.eventhandler.v1.ListCountResponse>}
 */
const methodInfo_EventHandler_CountEventObjects = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.eventhandler.v1.ListCountResponse,
  /** @param {!proto.veidemann.api.eventhandler.v1.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.eventhandler.v1.ListCountResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.eventhandler.v1.ListCountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.ListCountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.countEventObjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/CountEventObjects',
      request,
      metadata || {},
      methodInfo_EventHandler_CountEventObjects,
      callback);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.eventhandler.v1.ListCountResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.countEventObjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/CountEventObjects',
      request,
      metadata || {},
      methodInfo_EventHandler_CountEventObjects);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.eventhandler.v1.SaveRequest,
 *   !proto.veidemann.api.eventhandler.v1.EventObject>}
 */
const methodInfo_EventHandler_SaveEventObject = new grpc.web.AbstractClientBase.MethodInfo(
  eventhandler_v1_resources_pb.EventObject,
  /** @param {!proto.veidemann.api.eventhandler.v1.SaveRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  eventhandler_v1_resources_pb.EventObject.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.SaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.eventhandler.v1.EventObject)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.EventObject>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.saveEventObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/SaveEventObject',
      request,
      metadata || {},
      methodInfo_EventHandler_SaveEventObject,
      callback);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.SaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.eventhandler.v1.EventObject>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.saveEventObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/SaveEventObject',
      request,
      metadata || {},
      methodInfo_EventHandler_SaveEventObject);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.eventhandler.v1.UpdateRequest,
 *   !proto.veidemann.api.eventhandler.v1.UpdateResponse>}
 */
const methodInfo_EventHandler_UpdateEventObjects = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.eventhandler.v1.UpdateResponse,
  /** @param {!proto.veidemann.api.eventhandler.v1.UpdateRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.eventhandler.v1.UpdateResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.eventhandler.v1.UpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.UpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.updateEventObjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/UpdateEventObjects',
      request,
      metadata || {},
      methodInfo_EventHandler_UpdateEventObjects,
      callback);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.eventhandler.v1.UpdateResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.updateEventObjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/UpdateEventObjects',
      request,
      metadata || {},
      methodInfo_EventHandler_UpdateEventObjects);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.eventhandler.v1.EventObject,
 *   !proto.veidemann.api.eventhandler.v1.DeleteResponse>}
 */
const methodInfo_EventHandler_DeleteEventObject = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.eventhandler.v1.DeleteResponse,
  /** @param {!proto.veidemann.api.eventhandler.v1.EventObject} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.eventhandler.v1.DeleteResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.EventObject} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.eventhandler.v1.DeleteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.DeleteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.deleteEventObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/DeleteEventObject',
      request,
      metadata || {},
      methodInfo_EventHandler_DeleteEventObject,
      callback);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.EventObject} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.eventhandler.v1.DeleteResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.deleteEventObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/DeleteEventObject',
      request,
      metadata || {},
      methodInfo_EventHandler_DeleteEventObject);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.eventhandler.v1.ListLabelRequest,
 *   !proto.veidemann.api.eventhandler.v1.ListLabelResponse>}
 */
const methodInfo_EventHandler_ListLabels = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.eventhandler.v1.ListLabelResponse,
  /** @param {!proto.veidemann.api.eventhandler.v1.ListLabelRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.eventhandler.v1.ListLabelResponse.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.eventhandler.v1.ListLabelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.eventhandler.v1.ListLabelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.eventhandler.v1.ListLabelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.eventhandler.v1.EventHandlerClient.prototype.listLabels =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/ListLabels',
      request,
      metadata || {},
      methodInfo_EventHandler_ListLabels,
      callback);
};


/**
 * @param {!proto.veidemann.api.eventhandler.v1.ListLabelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.eventhandler.v1.ListLabelResponse>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.eventhandler.v1.EventHandlerPromiseClient.prototype.listLabels =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.eventhandler.v1.EventHandler/ListLabels',
      request,
      metadata || {},
      methodInfo_EventHandler_ListLabels);
};


module.exports = proto.veidemann.api.eventhandler.v1;

