/**
 * module providing general types used by all API interfaces
 */

/**
 * base type of all dynalist API responses.
 * The property `_msg` is only set if _code is not equal to `Ok`.
 *
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
  _code:
    | "Ok"
    | "Invalid"
    | "TooManyRequests"
    | "InvalidToken"
    | "LockFail"
    | "Unauthorized"
    | "NotFound"
    | "NodeNotFound"
    | "NoInbox"
  _msg?: string
}
