/**
 * @fileoverview gRPC-Web generated client stub for veidemann.api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var veidemann_api_config_pb = require('../veidemann_api/config_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_api_annotations_pb = require('../google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('../protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.veidemann = {};
proto.veidemann.api = require('./controller_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.veidemann.api.ControllerClient =
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
proto.veidemann.api.ControllerPromiseClient =
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
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.CrawlEntity>}
 */
const methodInfo_Controller_GetCrawlEntity = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlEntity,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlEntity.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlEntity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlEntity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getCrawlEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlEntity',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlEntity,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlEntity>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getCrawlEntity =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlEntity',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlEntity);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.CrawlEntityListReply>}
 */
const methodInfo_Controller_ListCrawlEntities = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.CrawlEntityListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.CrawlEntityListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlEntityListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlEntityListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listCrawlEntities =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlEntities',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlEntities,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlEntityListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listCrawlEntities =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlEntities',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlEntities);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlEntity,
 *   !proto.veidemann.api.CrawlEntity>}
 */
const methodInfo_Controller_SaveEntity = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlEntity,
  /** @param {!proto.veidemann.api.CrawlEntity} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlEntity.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlEntity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlEntity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlEntity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveEntity',
      request,
      metadata || {},
      methodInfo_Controller_SaveEntity,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlEntity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlEntity>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveEntity =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveEntity',
      request,
      metadata || {},
      methodInfo_Controller_SaveEntity);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlEntity,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteEntity = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.CrawlEntity} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlEntity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteEntity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteEntity',
      request,
      metadata || {},
      methodInfo_Controller_DeleteEntity,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlEntity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteEntity =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteEntity',
      request,
      metadata || {},
      methodInfo_Controller_DeleteEntity);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.Seed>}
 */
const methodInfo_Controller_GetSeed = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.Seed,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.Seed.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.Seed)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.Seed>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getSeed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetSeed',
      request,
      metadata || {},
      methodInfo_Controller_GetSeed,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.Seed>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getSeed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetSeed',
      request,
      metadata || {},
      methodInfo_Controller_GetSeed);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.SeedListRequest,
 *   !proto.veidemann.api.SeedListReply>}
 */
const methodInfo_Controller_ListSeeds = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.SeedListReply,
  /** @param {!proto.veidemann.api.SeedListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.SeedListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.SeedListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.SeedListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.SeedListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listSeeds =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListSeeds',
      request,
      metadata || {},
      methodInfo_Controller_ListSeeds,
      callback);
};


/**
 * @param {!proto.veidemann.api.SeedListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.SeedListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listSeeds =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListSeeds',
      request,
      metadata || {},
      methodInfo_Controller_ListSeeds);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.Seed,
 *   !proto.veidemann.api.Seed>}
 */
const methodInfo_Controller_SaveSeed = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.Seed,
  /** @param {!proto.veidemann.api.Seed} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.Seed.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.Seed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.Seed)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.Seed>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveSeed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveSeed',
      request,
      metadata || {},
      methodInfo_Controller_SaveSeed,
      callback);
};


/**
 * @param {!proto.veidemann.api.Seed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.Seed>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveSeed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveSeed',
      request,
      metadata || {},
      methodInfo_Controller_SaveSeed);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.Seed,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteSeed = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.Seed} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.Seed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteSeed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteSeed',
      request,
      metadata || {},
      methodInfo_Controller_DeleteSeed,
      callback);
};


/**
 * @param {!proto.veidemann.api.Seed} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteSeed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteSeed',
      request,
      metadata || {},
      methodInfo_Controller_DeleteSeed);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.CrawlJob>}
 */
const methodInfo_Controller_GetCrawlJob = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlJob,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlJob.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlJob)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlJob>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getCrawlJob =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlJob',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlJob,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlJob>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getCrawlJob =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlJob',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlJob);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.CrawlJobListReply>}
 */
const methodInfo_Controller_ListCrawlJobs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.CrawlJobListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.CrawlJobListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlJobListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlJobListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listCrawlJobs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlJobs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlJobs,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlJobListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listCrawlJobs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlJobs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlJobs);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlJob,
 *   !proto.veidemann.api.CrawlJob>}
 */
const methodInfo_Controller_SaveCrawlJob = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlJob,
  /** @param {!proto.veidemann.api.CrawlJob} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlJob.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlJob} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlJob)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlJob>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveCrawlJob =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlJob',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlJob,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlJob} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlJob>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveCrawlJob =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlJob',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlJob);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlJob,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteCrawlJob = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.CrawlJob} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlJob} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteCrawlJob =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlJob',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlJob,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlJob} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteCrawlJob =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlJob',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlJob);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.CrawlConfig>}
 */
const methodInfo_Controller_GetCrawlConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlConfig,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getCrawlConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getCrawlConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.CrawlConfigListReply>}
 */
const methodInfo_Controller_ListCrawlConfigs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.CrawlConfigListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.CrawlConfigListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlConfigListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlConfigListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listCrawlConfigs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlConfigs,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlConfigListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listCrawlConfigs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlConfigs);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlConfig,
 *   !proto.veidemann.api.CrawlConfig>}
 */
const methodInfo_Controller_SaveCrawlConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlConfig,
  /** @param {!proto.veidemann.api.CrawlConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveCrawlConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveCrawlConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlConfig,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteCrawlConfig = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.CrawlConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteCrawlConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteCrawlConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.CrawlScheduleConfig>}
 */
const methodInfo_Controller_GetCrawlScheduleConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlScheduleConfig,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlScheduleConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlScheduleConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlScheduleConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getCrawlScheduleConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlScheduleConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlScheduleConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlScheduleConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getCrawlScheduleConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlScheduleConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlScheduleConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.CrawlScheduleConfigListReply>}
 */
const methodInfo_Controller_ListCrawlScheduleConfigs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.CrawlScheduleConfigListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.CrawlScheduleConfigListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlScheduleConfigListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlScheduleConfigListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listCrawlScheduleConfigs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlScheduleConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlScheduleConfigs,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlScheduleConfigListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listCrawlScheduleConfigs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlScheduleConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlScheduleConfigs);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlScheduleConfig,
 *   !proto.veidemann.api.CrawlScheduleConfig>}
 */
const methodInfo_Controller_SaveCrawlScheduleConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlScheduleConfig,
  /** @param {!proto.veidemann.api.CrawlScheduleConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlScheduleConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlScheduleConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlScheduleConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlScheduleConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveCrawlScheduleConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlScheduleConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlScheduleConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlScheduleConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlScheduleConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveCrawlScheduleConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlScheduleConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlScheduleConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlScheduleConfig,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteCrawlScheduleConfig = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.CrawlScheduleConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlScheduleConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteCrawlScheduleConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlScheduleConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlScheduleConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlScheduleConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteCrawlScheduleConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlScheduleConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlScheduleConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.PolitenessConfig>}
 */
const methodInfo_Controller_GetPolitenessConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.PolitenessConfig,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.PolitenessConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.PolitenessConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.PolitenessConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getPolitenessConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetPolitenessConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetPolitenessConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.PolitenessConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getPolitenessConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetPolitenessConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetPolitenessConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.PolitenessConfigListReply>}
 */
const methodInfo_Controller_ListPolitenessConfigs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.PolitenessConfigListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.PolitenessConfigListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.PolitenessConfigListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.PolitenessConfigListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listPolitenessConfigs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListPolitenessConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListPolitenessConfigs,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.PolitenessConfigListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listPolitenessConfigs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListPolitenessConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListPolitenessConfigs);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.PolitenessConfig,
 *   !proto.veidemann.api.PolitenessConfig>}
 */
const methodInfo_Controller_SavePolitenessConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.PolitenessConfig,
  /** @param {!proto.veidemann.api.PolitenessConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.PolitenessConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.PolitenessConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.PolitenessConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.PolitenessConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.savePolitenessConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SavePolitenessConfig',
      request,
      metadata || {},
      methodInfo_Controller_SavePolitenessConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.PolitenessConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.PolitenessConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.savePolitenessConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SavePolitenessConfig',
      request,
      metadata || {},
      methodInfo_Controller_SavePolitenessConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.PolitenessConfig,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeletePolitenessConfig = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.PolitenessConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.PolitenessConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deletePolitenessConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeletePolitenessConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeletePolitenessConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.PolitenessConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deletePolitenessConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeletePolitenessConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeletePolitenessConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.BrowserConfig>}
 */
const methodInfo_Controller_GetBrowserConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.BrowserConfig,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.BrowserConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.BrowserConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.BrowserConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getBrowserConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetBrowserConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetBrowserConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.BrowserConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getBrowserConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetBrowserConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetBrowserConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.BrowserConfigListReply>}
 */
const methodInfo_Controller_ListBrowserConfigs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.BrowserConfigListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.BrowserConfigListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.BrowserConfigListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.BrowserConfigListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listBrowserConfigs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListBrowserConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListBrowserConfigs,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.BrowserConfigListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listBrowserConfigs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListBrowserConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListBrowserConfigs);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.BrowserConfig,
 *   !proto.veidemann.api.BrowserConfig>}
 */
const methodInfo_Controller_SaveBrowserConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.BrowserConfig,
  /** @param {!proto.veidemann.api.BrowserConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.BrowserConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.BrowserConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.BrowserConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.BrowserConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveBrowserConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveBrowserConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveBrowserConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.BrowserConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.BrowserConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveBrowserConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveBrowserConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveBrowserConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.BrowserConfig,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteBrowserConfig = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.BrowserConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.BrowserConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteBrowserConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteBrowserConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteBrowserConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.BrowserConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteBrowserConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteBrowserConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteBrowserConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.BrowserScript>}
 */
const methodInfo_Controller_GetBrowserScript = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.BrowserScript,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.BrowserScript.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.BrowserScript)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.BrowserScript>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getBrowserScript =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetBrowserScript',
      request,
      metadata || {},
      methodInfo_Controller_GetBrowserScript,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.BrowserScript>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getBrowserScript =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetBrowserScript',
      request,
      metadata || {},
      methodInfo_Controller_GetBrowserScript);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.BrowserScriptListReply>}
 */
const methodInfo_Controller_ListBrowserScripts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.BrowserScriptListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.BrowserScriptListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.BrowserScriptListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.BrowserScriptListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listBrowserScripts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListBrowserScripts',
      request,
      metadata || {},
      methodInfo_Controller_ListBrowserScripts,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.BrowserScriptListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listBrowserScripts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListBrowserScripts',
      request,
      metadata || {},
      methodInfo_Controller_ListBrowserScripts);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.BrowserScript,
 *   !proto.veidemann.api.BrowserScript>}
 */
const methodInfo_Controller_SaveBrowserScript = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.BrowserScript,
  /** @param {!proto.veidemann.api.BrowserScript} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.BrowserScript.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.BrowserScript} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.BrowserScript)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.BrowserScript>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveBrowserScript =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveBrowserScript',
      request,
      metadata || {},
      methodInfo_Controller_SaveBrowserScript,
      callback);
};


/**
 * @param {!proto.veidemann.api.BrowserScript} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.BrowserScript>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveBrowserScript =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveBrowserScript',
      request,
      metadata || {},
      methodInfo_Controller_SaveBrowserScript);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.BrowserScript,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteBrowserScript = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.BrowserScript} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.BrowserScript} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteBrowserScript =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteBrowserScript',
      request,
      metadata || {},
      methodInfo_Controller_DeleteBrowserScript,
      callback);
};


/**
 * @param {!proto.veidemann.api.BrowserScript} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteBrowserScript =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteBrowserScript',
      request,
      metadata || {},
      methodInfo_Controller_DeleteBrowserScript);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.GetRequest,
 *   !proto.veidemann.api.CrawlHostGroupConfig>}
 */
const methodInfo_Controller_GetCrawlHostGroupConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlHostGroupConfig,
  /** @param {!proto.veidemann.api.GetRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlHostGroupConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlHostGroupConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlHostGroupConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getCrawlHostGroupConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlHostGroupConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlHostGroupConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlHostGroupConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getCrawlHostGroupConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetCrawlHostGroupConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetCrawlHostGroupConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.ListRequest,
 *   !proto.veidemann.api.CrawlHostGroupConfigListReply>}
 */
const methodInfo_Controller_ListCrawlHostGroupConfigs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.CrawlHostGroupConfigListReply,
  /** @param {!proto.veidemann.api.ListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.CrawlHostGroupConfigListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlHostGroupConfigListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlHostGroupConfigListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listCrawlHostGroupConfigs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlHostGroupConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlHostGroupConfigs,
      callback);
};


/**
 * @param {!proto.veidemann.api.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlHostGroupConfigListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listCrawlHostGroupConfigs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListCrawlHostGroupConfigs',
      request,
      metadata || {},
      methodInfo_Controller_ListCrawlHostGroupConfigs);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlHostGroupConfig,
 *   !proto.veidemann.api.CrawlHostGroupConfig>}
 */
const methodInfo_Controller_SaveCrawlHostGroupConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.CrawlHostGroupConfig,
  /** @param {!proto.veidemann.api.CrawlHostGroupConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.CrawlHostGroupConfig.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlHostGroupConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.CrawlHostGroupConfig)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.CrawlHostGroupConfig>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveCrawlHostGroupConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlHostGroupConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlHostGroupConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlHostGroupConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.CrawlHostGroupConfig>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveCrawlHostGroupConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveCrawlHostGroupConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveCrawlHostGroupConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.CrawlHostGroupConfig,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteCrawlHostGroupConfig = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.CrawlHostGroupConfig} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.CrawlHostGroupConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteCrawlHostGroupConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlHostGroupConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlHostGroupConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.CrawlHostGroupConfig} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteCrawlHostGroupConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteCrawlHostGroupConfig',
      request,
      metadata || {},
      methodInfo_Controller_DeleteCrawlHostGroupConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.veidemann.api.LogLevels>}
 */
const methodInfo_Controller_GetLogConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.LogLevels,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.LogLevels.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.LogLevels)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.LogLevels>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getLogConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetLogConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetLogConfig,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.LogLevels>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getLogConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetLogConfig',
      request,
      metadata || {},
      methodInfo_Controller_GetLogConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.LogLevels,
 *   !proto.veidemann.api.LogLevels>}
 */
const methodInfo_Controller_SaveLogConfig = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.LogLevels,
  /** @param {!proto.veidemann.api.LogLevels} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.LogLevels.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.LogLevels} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.LogLevels)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.LogLevels>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveLogConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveLogConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveLogConfig,
      callback);
};


/**
 * @param {!proto.veidemann.api.LogLevels} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.LogLevels>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveLogConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveLogConfig',
      request,
      metadata || {},
      methodInfo_Controller_SaveLogConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.RoleMappingsListRequest,
 *   !proto.veidemann.api.RoleMappingsListReply>}
 */
const methodInfo_Controller_ListRoleMappings = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.RoleMappingsListReply,
  /** @param {!proto.veidemann.api.RoleMappingsListRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.RoleMappingsListReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.RoleMappingsListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.RoleMappingsListReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.RoleMappingsListReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.listRoleMappings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/ListRoleMappings',
      request,
      metadata || {},
      methodInfo_Controller_ListRoleMappings,
      callback);
};


/**
 * @param {!proto.veidemann.api.RoleMappingsListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.RoleMappingsListReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.listRoleMappings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/ListRoleMappings',
      request,
      metadata || {},
      methodInfo_Controller_ListRoleMappings);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.RoleMapping,
 *   !proto.veidemann.api.RoleMapping>}
 */
const methodInfo_Controller_SaveRoleMapping = new grpc.web.AbstractClientBase.MethodInfo(
  veidemann_api_config_pb.RoleMapping,
  /** @param {!proto.veidemann.api.RoleMapping} request */
  function(request) {
    return request.serializeBinary();
  },
  veidemann_api_config_pb.RoleMapping.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.RoleMapping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.RoleMapping)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.RoleMapping>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.saveRoleMapping =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/SaveRoleMapping',
      request,
      metadata || {},
      methodInfo_Controller_SaveRoleMapping,
      callback);
};


/**
 * @param {!proto.veidemann.api.RoleMapping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.RoleMapping>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.saveRoleMapping =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/SaveRoleMapping',
      request,
      metadata || {},
      methodInfo_Controller_SaveRoleMapping);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.RoleMapping,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Controller_DeleteRoleMapping = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.veidemann.api.RoleMapping} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.RoleMapping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.deleteRoleMapping =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteRoleMapping',
      request,
      metadata || {},
      methodInfo_Controller_DeleteRoleMapping,
      callback);
};


/**
 * @param {!proto.veidemann.api.RoleMapping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.deleteRoleMapping =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/DeleteRoleMapping',
      request,
      metadata || {},
      methodInfo_Controller_DeleteRoleMapping);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.veidemann.api.RoleList>}
 */
const methodInfo_Controller_GetRolesForActiveUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.RoleList,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.RoleList.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.RoleList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.RoleList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getRolesForActiveUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetRolesForActiveUser',
      request,
      metadata || {},
      methodInfo_Controller_GetRolesForActiveUser,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.RoleList>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getRolesForActiveUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetRolesForActiveUser',
      request,
      metadata || {},
      methodInfo_Controller_GetRolesForActiveUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.veidemann.api.RunCrawlRequest,
 *   !proto.veidemann.api.RunCrawlReply>}
 */
const methodInfo_Controller_RunCrawl = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.RunCrawlReply,
  /** @param {!proto.veidemann.api.RunCrawlRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.RunCrawlReply.deserializeBinary
);


/**
 * @param {!proto.veidemann.api.RunCrawlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.RunCrawlReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.RunCrawlReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.runCrawl =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/RunCrawl',
      request,
      metadata || {},
      methodInfo_Controller_RunCrawl,
      callback);
};


/**
 * @param {!proto.veidemann.api.RunCrawlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.RunCrawlReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.runCrawl =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/RunCrawl',
      request,
      metadata || {},
      methodInfo_Controller_RunCrawl);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.veidemann.api.OpenIdConnectIssuerReply>}
 */
const methodInfo_Controller_GetOpenIdConnectIssuer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.veidemann.api.OpenIdConnectIssuerReply,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.veidemann.api.OpenIdConnectIssuerReply.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.veidemann.api.OpenIdConnectIssuerReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.veidemann.api.OpenIdConnectIssuerReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.veidemann.api.ControllerClient.prototype.getOpenIdConnectIssuer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/veidemann.api.Controller/GetOpenIdConnectIssuer',
      request,
      metadata || {},
      methodInfo_Controller_GetOpenIdConnectIssuer,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.veidemann.api.OpenIdConnectIssuerReply>}
 *     A native promise that resolves to the response
 */
proto.veidemann.api.ControllerPromiseClient.prototype.getOpenIdConnectIssuer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/veidemann.api.Controller/GetOpenIdConnectIssuer',
      request,
      metadata || {},
      methodInfo_Controller_GetOpenIdConnectIssuer);
};


module.exports = proto.veidemann.api;

