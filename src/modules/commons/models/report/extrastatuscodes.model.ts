/**
 * Status codes in addition to those defined by http.
 * This list is based on error codes from Heritrix
 */

export enum ExtraStatusCodes {
  /**
   * SUCCESSFUL_DNS (1)
   * Successful DNS lookup
   */
  SUCCESSFUL_DNS = 1,
  /**
   * NEVER_TRIED (0)
   * Fetch never tried (perhaps protocol unsupported or illegal URI)
   */
  NEVER_TRIED = 0,
  /**
   * FAILED_DNS (-1)
   * DNS lookup failed
   */
  FAILED_DNS = -1,
  /**
   * CONNECT_FAILED (-2)
   * HTTP connect failed
   */
  CONNECT_FAILED = -2,
  /**
   * CONNECT_BROKEN (-3)
   * HTTP connect broken
   */
  CONNECT_BROKEN = -3,
  /**
   * HTTP_TIMEOUT (-4)
   * HTTP timeout
   */
  HTTP_TIMEOUT = -4,
  /**
   * RUNTIME_EXCEPTION (-5)
   * Unexpected runtime exception.  See runtime-errors.log.
   */
  RUNTIME_EXCEPTION = -5,
  /**
   * DOMAIN_LOOKUP_FAILED (-6)
   * Prerequisite domain-lookup failed, precluding fetch attempt.
   */
  DOMAIN_LOOKUP_FAILED = -6,
  /**
   * ILLEGAL_URI (-7)
   * URI recognized as unsupported or illegal.
   */
  ILLEGAL_URI = -7,
  /**
   * RETRY_LIMIT_REACHED (-8)
   * Multiple retries failed, retry limit reached.
   */
  RETRY_LIMIT_REACHED = -8,
  /**
   * FAILED_FETCHING_ROBOTS (-61)
   * Prerequisite robots.txt fetch failed, precluding a fetch attempt.
   */
  FAILED_FETCHING_ROBOTS = -61,
  /**
   * EMPTY_RESPONSE (-404)
   * Empty HTTP response interpreted as a 404.
   */
  EMPTY_RESPONSE = -404,
  /**
   * SEVERE (-3000)
   * Severe Java Error condition occured such as OutOfMemoryError or StackOverflowError during URI processing.
   */
  SEVERE = -3000,
  /**
   * CHAFF_DETECTION (-4000)
   * Chaff detection of traps/content with negligible value applied.
   */
  CHAFF_DETECTION = -4000,
  /**
   * TOO_MANY_HOPS (-4001)
   * The URI is too many link hops away from the seed.
   */
  TOO_MANY_HOPS = -4001,
  /**
   * TOO_MANY_TRANSITIVE_HOPS (-4002)
   * The URI is too many embed/transitive hops away from the last URI in scope.
   */
  TOO_MANY_TRANSITIVE_HOPS = -4002,
  /**
   * ALREADY_SEEN (-4100)
   * The URI is already fetched.
   * Might happen if two URI's after normalization points to the same resource.
   */
  ALREADY_SEEN = -4100,
  /**
   * PRECLUDED_BY_SCOPE_CHANGE (-5000)
   * The URI is out of scope upon reexamination.  This only happens if the scope changes during the crawl.
   */
  PRECLUDED_BY_SCOPE_CHANGE = -5000,
  /**
   * BLOCKED (-5001)
   * Blocked from fetch by user setting.
   */
  BLOCKED = -5001,
  /**
   * BLOCKED_BY_CUSTOM_PROCESSOR (-5002)
   * Blocked by a custom processor.
   */
  BLOCKED_BY_CUSTOM_PROCESSOR = -5002,
  /**
   * BLOCKED_MIXED_CONTENT (-5010)
   * Blocked because insecure content was loaded from secure context.
   */
  BLOCKED_MIXED_CONTENT = -5010,
  /**
   * CANCELED_BY_BROWSER (-5011)
   * The browser driving the fetch canceled the request.
   */
  CANCELED_BY_BROWSER = -5011,
  /**
   * QUOTA_EXCEEDED (-5003)
   * Blocked due to exceeding an established quota.
   */
  QUOTA_EXCEEDED = -5003,
  /**
   * RUNTIME_EXCEEDED (-5004)
   * Blocked due to exceeding an established runtime
   */
  RUNTIME_EXCEEDED = -5004,
  /**
   * DELETED_FROM_FRONTIER (-6000)
   * Deleted from Frontier by user.
   */
  DELETED_FROM_FRONTIER = -6000,
  /**
   * PRECLUDED_BY_ROBOTS (-9998)
   * Robots.txt rules precluded fetch.
   */
  PRECLUDED_BY_ROBOTS = -9998,

}



