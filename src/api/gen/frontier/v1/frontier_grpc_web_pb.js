/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api.frontier.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var commons_v1_resources_pb = require('../../commons/v1/resources_pb.js')

var config_v1_resources_pb = require('../../config/v1/resources_pb.js')

var frontier_v1_resources_pb = require('../../frontier/v1/resources_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = {};
proto.veidemann.api.frontier = {};
proto.veidemann.api.frontier.v1 = require('./frontier_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.frontier.v1.FrontierClient =
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

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.frontier.v1.FrontierPromiseClient =
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

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.veidemann.api.frontier.v1.CrawlSeedRequest,
 *   !proto.veidemann.api.frontier.v1.CrawlExecutionId>}
 */
const methodDescriptor_Frontier_CrawlSeed = new grpc.web.MethodDescriptor(
  '/veidemann.api.frontier.v1.Frontier/CrawlSeed',
  grpc.web.MethodType.UNARY,
  proto.veidemann.api.frontier.v1.CrawlSeedRequest,
  proto.veidemann.api.frontier.v1.CrawlExecutionId,
  /**
   * @param {!proto.veidemann.api.frontier.v1.CrawlSeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.frontier.v1.CrawlExecutionId.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.frontier.v1.CrawlSeedRequest,
 *   !proto.veidemann.api.frontier.v1.CrawlExecutionId>}
 */
const methodInfo_Frontier_CrawlSeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.frontier.v1.CrawlExecutionId,
  /**
   * @param {!proto.veidemann.api.frontier.v1.CrawlSeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.frontier.v1.CrawlExecutionId.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.frontier.v1.CrawlSeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.frontier.v1.CrawlExecutionId)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.frontier.v1.CrawlExecutionId>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.frontier.v1.FrontierClient.prototype.crawlSeed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.frontier.v1.Frontier/CrawlSeed',
      request,
      metadata || {},
      methodDescriptor_Frontier_CrawlSeed,
      callback);
};


/**
 * @param {!proto.veidemann.api.frontier.v1.CrawlSeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.frontier.v1.CrawlExecutionId>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.frontier.v1.FrontierPromiseClient.prototype.crawlSeed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.frontier.v1.Frontier/CrawlSeed',
      request,
      metadata || {},
      methodDescriptor_Frontier_CrawlSeed);
};


module.exports = proto.veidemann.api.frontier.v1;

