// @formatter:off
// @ts-ignore
const statusMapping = {
  'Continue': 100,
  'Switching Protocols': 101,
  'Processing': 102,
  'Early Hints': 103,
  'Request-uri too long': 122,
  'Ok': 200,
  'Created': 201,
  'Accepted': 202,
  'Partial Information': 203,
  'No Content': 204,
  'Reset Content': 205,
  'Partial Content': 206,
  'Multi-Status': 207,
  'Already Reported': 208,
  'Im Used': 226,
  'Moved': 301,
  'Found': 302,
  'Method': 303,
  'Not Modified': 304,
  'Use Proxy': 305,
  'Switch Proxy': 306,
  'Temporary Redirect': 307,
  'Permanent Redirect': 308,
  'Bad Request': 400,
  'Unauthorized': 401,
  'Payment Required': 402,
  'Forbidden': 403,
  'Not Found': 404,
  'Method Not Allowed': 405,
  'Not Acceptable': 406,
  'Proxy Authentication Required': 407,
  'Request Timeout': 408,
  'Conflict': 409,
  'Gone': 410,
  'Length Required': 411,
  'Precondition Failed': 412,
  'Request Entity Too Large': 413,
  'Request URI Too Large': 414,
  'Unsupported Media Type': 415,
  'Requested Rage Not Satisfiable': 416,
  'Expectation Failed': 417,
  'I\'m a teapot': 418,
  'Enhance Your Calm': 420,
  'Misdirected Request': 421,
  'Unprocessable Entity': 422,
  'Locked': 423,
  'Failed Dependency': 424,
  'Upgrade Required': 426,
  'Precondition Required': 428,
  'Too Many Requests': 429,
  'Request Header Fields Too Large': 431,
  'No Response': 444,
  'Retry With': 449,
  'Blocked By Windows Parental Controls': 450,
  'Wrong Exchange Server': 451,
  'Client Closed Request': 499,
  'Internal Error': 500,
  'Not Implemented': 501,
  'Service temporarily overloaded': 502,
  'Gateway timeout': 503,
  'Gateway Timeout': 504,
  'Http Version Not Supported': 505,
  'Variant Also Negotiates': 506,
  'Insufficient Storage': 507,
  'Loop Detected': 508,
  'Bandwidth Limit Exceeded': 509,
  'Not Extended': 510,
  'Network Authentication Required': 511,
  'Network Read Timeout Error': 598,
  'Network Connect Timeout Error': 599,
} as const;
// @formatter:on

export type HttpStatus = keyof typeof statusMapping;
export type HttpStatusCode = typeof statusMapping[HttpStatus];
export type HttpStatusCodeFor<T extends HttpStatus> = typeof statusMapping[T];

export namespace HttpStatusCode {
  export function isValid(code: any): code is HttpStatusCode {
    return Object.values(statusMapping).includes(code);
  }

  export function parse(maybeStatusOrCode: HttpStatusCode | HttpStatus): HttpStatusCode;
  export function parse(maybeStatusOrCode: any): HttpStatusCode | undefined {
    if (typeof maybeStatusOrCode === 'string') {
      return HttpStatus.isValid(maybeStatusOrCode)
        ? HttpStatusCode.from(maybeStatusOrCode)
        : undefined;
    }

    return isValid(maybeStatusOrCode)
      ? maybeStatusOrCode
      : undefined;
  }

  export function from<T extends HttpStatus>(status: T): HttpStatusCodeFor<T> {
    return statusMapping[status];
  }
}

export namespace HttpStatus {
  export function isValid(status: string): status is HttpStatus {
    return Object.keys(status).includes(status);
  }
}
