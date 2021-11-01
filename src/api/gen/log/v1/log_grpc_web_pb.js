/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api.log.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var commons_v1_resources_pb = require('../../commons/v1/resources_pb.js')

var log_v1_resources_pb = require('../../log/v1/resources_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = {};
proto.veidemann.api.log = {};
proto.veidemann.api.log.v1 = require('./log_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.log.v1.LogClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.log.v1.LogPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.veidemann.api.log.v1.CrawlLogListRequest,
 *   !proto.veidemann.api.log.v1.CrawlLog>}
 */
const methodDescriptor_Log_ListCrawlLogs = new grpc.web.MethodDescriptor(
  '/veidemann.api.log.v1.Log/ListCrawlLogs',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.veidemann.api.log.v1.CrawlLogListRequest,
  log_v1_resources_pb.CrawlLog,
  /**
   * @param {!proto.veidemann.api.log.v1.CrawlLogListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  log_v1_resources_pb.CrawlLog.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.log.v1.CrawlLogListRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.log.v1.CrawlLog>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.log.v1.LogClient.prototype.listCrawlLogs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.log.v1.Log/ListCrawlLogs',
      request,
      metadata || {},
      methodDescriptor_Log_ListCrawlLogs);
};


/**
 * @param {!proto.veidemann.api.log.v1.CrawlLogListRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.log.v1.CrawlLog>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.log.v1.LogPromiseClient.prototype.listCrawlLogs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.log.v1.Log/ListCrawlLogs',
      request,
      metadata || {},
      methodDescriptor_Log_ListCrawlLogs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.veidemann.api.log.v1.PageLogListRequest,
 *   !proto.veidemann.api.log.v1.PageLog>}
 */
const methodDescriptor_Log_ListPageLogs = new grpc.web.MethodDescriptor(
  '/veidemann.api.log.v1.Log/ListPageLogs',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.veidemann.api.log.v1.PageLogListRequest,
  log_v1_resources_pb.PageLog,
  /**
   * @param {!proto.veidemann.api.log.v1.PageLogListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  log_v1_resources_pb.PageLog.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.log.v1.PageLogListRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.log.v1.PageLog>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.log.v1.LogClient.prototype.listPageLogs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.log.v1.Log/ListPageLogs',
      request,
      metadata || {},
      methodDescriptor_Log_ListPageLogs);
};


/**
 * @param {!proto.veidemann.api.log.v1.PageLogListRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.log.v1.PageLog>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.log.v1.LogPromiseClient.prototype.listPageLogs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.log.v1.Log/ListPageLogs',
      request,
      metadata || {},
      methodDescriptor_Log_ListPageLogs);
};


module.exports = proto.veidemann.api.log.v1;

