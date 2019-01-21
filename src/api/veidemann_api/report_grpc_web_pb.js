/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var frontier_v1_resources_pb = require('../frontier/v1/resources_pb.js')

var veidemann_api_messages_pb = require('../veidemann_api/messages_pb.js')

var google_api_annotations_pb = require('../google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('../protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = require('./report_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.ReportClient =
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
proto.veidemann.api.ReportPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.veidemann.api.ReportClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.veidemann.api.ReportClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlLogListRequest,
 *   !proto.veidemann.api.CrawlLogListReply>}
 */
const methodInfo_Report_ListCrawlLogs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.CrawlLogListReply,
  /** @param {!proto.veidemann.api.CrawlLogListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.CrawlLogListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlLogListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlLogListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlLogListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportClient.prototype.listCrawlLogs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Report/ListCrawlLogs',
      request,
      metadata || {},
      methodInfo_Report_ListCrawlLogs,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlLogListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlLogListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportPromiseClient.prototype.listCrawlLogs =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.listCrawlLogs(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.PageLogListRequest,
 *   !proto.veidemann.api.PageLogListReply>}
 */
const methodInfo_Report_ListPageLogs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.PageLogListReply,
  /** @param {!proto.veidemann.api.PageLogListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.PageLogListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.PageLogListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.PageLogListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.PageLogListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportClient.prototype.listPageLogs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Report/ListPageLogs',
      request,
      metadata || {},
      methodInfo_Report_ListPageLogs,
      callback);
};


/**
 * @param {!proto.veidemann.api.PageLogListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.PageLogListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportPromiseClient.prototype.listPageLogs =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.listPageLogs(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ScreenshotListRequest,
 *   !proto.veidemann.api.ScreenshotListReply>}
 */
const methodInfo_Report_ListScreenshots = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.ScreenshotListReply,
  /** @param {!proto.veidemann.api.ScreenshotListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.ScreenshotListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ScreenshotListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.ScreenshotListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.ScreenshotListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportClient.prototype.listScreenshots =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Report/ListScreenshots',
      request,
      metadata || {},
      methodInfo_Report_ListScreenshots,
      callback);
};


/**
 * @param {!proto.veidemann.api.ScreenshotListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.ScreenshotListReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportPromiseClient.prototype.listScreenshots =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.listScreenshots(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ExecuteDbQueryRequest,
 *   !proto.veidemann.api.ExecuteDbQueryReply>}
 */
const methodInfo_Report_ExecuteDbQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.ExecuteDbQueryReply,
  /** @param {!proto.veidemann.api.ExecuteDbQueryRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.ExecuteDbQueryReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ExecuteDbQueryRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.ExecuteDbQueryReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportClient.prototype.executeDbQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/veidemann.api.Report/ExecuteDbQuery',
      request,
      metadata,
      methodInfo_Report_ExecuteDbQuery);
};


/**
 * @param {!proto.veidemann.api.ExecuteDbQueryRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.ExecuteDbQueryReply>}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ReportPromiseClient.prototype.executeDbQuery =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/veidemann.api.Report/ExecuteDbQuery',
      request,
      metadata,
      methodInfo_Report_ExecuteDbQuery);
};


module.exports = proto.veidemann.api;

