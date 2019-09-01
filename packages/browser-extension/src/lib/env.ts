/**
 * Returns the value for the given environment variable.
 * Throws an error if the variable is not available.
 *
 * @param name the name of the env var
 */
export function getEnvVar(name: string): string

/**
 * Returns the value for the given environment variable.
 * Throws an error if the variable is not available and throwIfUnavailable is set to true (default).
 *
 * @param name the name of the env var
 * @param throwIfUnavailable set to true to throw an error if var is not available.
 */
export function getEnvVar(
  name: string,
  throwIfUnavailable: boolean,
): string | undefined

export function getEnvVar(name: string, throwIfUnavailable = true) {
  const value = process.env[name]
  if (typeof value === "undefined" && throwIfUnavailable) {
    throw new Error(`environment variable ${name} not available.`)
  }

  return value
}
