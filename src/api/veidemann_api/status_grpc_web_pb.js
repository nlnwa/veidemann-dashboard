/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var frontier_v1_resources_pb = require('../frontier/v1/resources_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_api_annotations_pb = require('../google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('../protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = require('./status_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.StatusClient =
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
proto.veidemann.api.StatusPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.veidemann.api.StatusClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.veidemann.api.StatusClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.RunningExecutionsRequest,
 *   !proto.veidemann.api.RunningExecutionsListReply>}
 */
const methodInfo_Status_GetRunningExecutions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.RunningExecutionsListReply,
  /** @param {!proto.veidemann.api.RunningExecutionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.RunningExecutionsListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.RunningExecutionsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.RunningExecutionsListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.getRunningExecutions =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.Status/GetRunningExecutions',
      request,
      metadata,
      methodInfo_Status_GetRunningExecutions);
};


/**
 * @param {!proto.veidemann.api.RunningExecutionsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.RunningExecutionsListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.getRunningExecutions =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/veidemann.api.Status/GetRunningExecutions',
      request,
      metadata,
      methodInfo_Status_GetRunningExecutions);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ExecutionId,
 *   !proto.veidemann.api.frontier.v1.CrawlExecutionStatus>}
 */
const methodInfo_Status_GetExecution = new grpc.web.AbstractClientBase.MethodInfo(
  frontier_v1_resources_pb.CrawlExecutionStatus,
  /** @param {!proto.veidemann.api.ExecutionId} request */
  function(request) {
    return request.serializeBinary();
  },
  frontier_v1_resources_pb.CrawlExecutionStatus.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.frontier.v1.CrawlExecutionStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.frontier.v1.CrawlExecutionStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.getExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Status/GetExecution',
      request,
      metadata || {},
      methodInfo_Status_GetExecution,
      callback);
};


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.frontier.v1.CrawlExecutionStatus>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.getExecution =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.getExecution(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListExecutionsRequest,
 *   !proto.veidemann.api.ExecutionsListReply>}
 */
const methodInfo_Status_ListExecutions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.ExecutionsListReply,
  /** @param {!proto.veidemann.api.ListExecutionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.ExecutionsListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListExecutionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.ExecutionsListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.ExecutionsListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.listExecutions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Status/ListExecutions',
      request,
      metadata || {},
      methodInfo_Status_ListExecutions,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListExecutionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.ExecutionsListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.listExecutions =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.listExecutions(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ExecutionId,
 *   !proto.veidemann.api.frontier.v1.CrawlExecutionStatus>}
 */
const methodInfo_Status_AbortExecution = new grpc.web.AbstractClientBase.MethodInfo(
  frontier_v1_resources_pb.CrawlExecutionStatus,
  /** @param {!proto.veidemann.api.ExecutionId} request */
  function(request) {
    return request.serializeBinary();
  },
  frontier_v1_resources_pb.CrawlExecutionStatus.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.frontier.v1.CrawlExecutionStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.frontier.v1.CrawlExecutionStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.abortExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Status/AbortExecution',
      request,
      metadata || {},
      methodInfo_Status_AbortExecution,
      callback);
};


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.frontier.v1.CrawlExecutionStatus>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.abortExecution =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.abortExecution(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ExecutionId,
 *   !proto.veidemann.api.frontier.v1.JobExecutionStatus>}
 */
const methodInfo_Status_GetJobExecution = new grpc.web.AbstractClientBase.MethodInfo(
  frontier_v1_resources_pb.JobExecutionStatus,
  /** @param {!proto.veidemann.api.ExecutionId} request */
  function(request) {
    return request.serializeBinary();
  },
  frontier_v1_resources_pb.JobExecutionStatus.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.frontier.v1.JobExecutionStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.frontier.v1.JobExecutionStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.getJobExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Status/GetJobExecution',
      request,
      metadata || {},
      methodInfo_Status_GetJobExecution,
      callback);
};


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.frontier.v1.JobExecutionStatus>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.getJobExecution =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.getJobExecution(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListJobExecutionsRequest,
 *   !proto.veidemann.api.JobExecutionsListReply>}
 */
const methodInfo_Status_ListJobExecutions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.JobExecutionsListReply,
  /** @param {!proto.veidemann.api.ListJobExecutionsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.JobExecutionsListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListJobExecutionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.JobExecutionsListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.JobExecutionsListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.listJobExecutions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Status/ListJobExecutions',
      request,
      metadata || {},
      methodInfo_Status_ListJobExecutions,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListJobExecutionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.JobExecutionsListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.listJobExecutions =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.listJobExecutions(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ExecutionId,
 *   !proto.veidemann.api.frontier.v1.JobExecutionStatus>}
 */
const methodInfo_Status_AbortJobExecution = new grpc.web.AbstractClientBase.MethodInfo(
  frontier_v1_resources_pb.JobExecutionStatus,
  /** @param {!proto.veidemann.api.ExecutionId} request */
  function(request) {
    return request.serializeBinary();
  },
  frontier_v1_resources_pb.JobExecutionStatus.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.frontier.v1.JobExecutionStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.frontier.v1.JobExecutionStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusClient.prototype.abortJobExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Status/AbortJobExecution',
      request,
      metadata || {},
      methodInfo_Status_AbortJobExecution,
      callback);
};


/**
 * @param {!proto.veidemann.api.ExecutionId} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.frontier.v1.JobExecutionStatus>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.StatusPromiseClient.prototype.abortJobExecution =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.abortJobExecution(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.veidemann.api;

