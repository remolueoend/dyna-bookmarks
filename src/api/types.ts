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
