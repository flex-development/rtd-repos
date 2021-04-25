import type { EnvironmentVariables } from '@/lib/interfaces'
import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import isBoolean from 'lodash/isBoolean'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import URI from 'urijs'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

/**
 * @file Config - Get Environment Variables
 * @module config/configuration
 */

/**
 * @property {string[]} DB_HOSTNAMES - Valid Firebase RTD hosts suffixes
 * @see https://firebase.google.com/docs/projects/locations#rtdb-locations
 */
const DB_HOSTNAMES = ['firebaseio.com', 'europe-west1.firebasedatabase.app']

/**
 * @property {string} ENVIRONMENTS - Support Node environments
 */
const ENVIRONMENTS = ['development', 'production', 'test']

/**
 * Returns an object containing the project's environment variables.
 *
 * Throws an error if any required variables are missing or invalid.
 *
 * @param {NodeJS.ProcessEnv} [env] - Object to use instead of `process.env`
 * @return {EnvironmentVariables} Environment variables
 * @throws {Exception}
 */
const configuration = (env?: typeof process['env']): EnvironmentVariables => {
  const {
    FIREBASE_CLIENT_EMAIL = '',
    FIREBASE_DATABASE_URL = '',
    FIREBASE_PRIVATE_KEY = '',
    FIREBASE_RTD_REPOS_VALIDATE = 'true',
    NODE_ENV = 'development'
  } = isPlainObject(env) ? (env as typeof process['env']) : process.env

  let exception: Exception | null = null

  if (!isEmail(FIREBASE_CLIENT_EMAIL)) {
    const message = 'FIREBASE_CLIENT_EMAIL is not a valid email'
    const data = { errors: { FIREBASE_CLIENT_EMAIL } }

    exception = new Exception(ExceptionStatusCode.UNAUTHORIZED, message, data)
  }

  if (!isURL(FIREBASE_DATABASE_URL)) {
    const message = 'FIREBASE_DATABASE_URL is not a valid URL'
    const data = { errors: { FIREBASE_DATABASE_URL } }

    exception = new Exception(ExceptionStatusCode.BAD_REQUEST, message, data)
  }

  const { hostname: DB_HOSTNAME = '' } = URI.parse(FIREBASE_DATABASE_URL)

  if (!DB_HOSTNAMES.some(h => DB_HOSTNAME.includes(h))) {
    const message = `Database hostname match not included in [${DB_HOSTNAMES}]`
    const data = { errors: { FIREBASE_DATABASE_URL, hostname: DB_HOSTNAME } }

    exception = new Exception(ExceptionStatusCode.BAD_REQUEST, message, data)
  }

  if (!isString(FIREBASE_PRIVATE_KEY) || !FIREBASE_PRIVATE_KEY.length) {
    const message = `FIREBASE_PRIVATE_KEY invalid`
    const data = { errors: { FIREBASE_PRIVATE_KEY } }

    exception = new Exception(ExceptionStatusCode.UNAUTHORIZED, message, data)
  }

  if (exception) {
    console.error(exception)
    throw exception
  }

  return {
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_DATABASE_URL: FIREBASE_DATABASE_URL.toLowerCase(),
    FIREBASE_PRIVATE_KEY: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    FIREBASE_RTD_REPOS_VALIDATE: (() => {
      const VM = JSON.parse(`${FIREBASE_RTD_REPOS_VALIDATE.toLowerCase()}`)
      return isBoolean(VM) ? VM : true
    })(),
    NODE_ENV: (() => {
      const ENV = (isString(NODE_ENV) ? NODE_ENV : '').toLowerCase()
      return ENVIRONMENTS.includes(ENV) ? ENV : 'development'
    })()
  }
}

export default configuration
export { DB_HOSTNAMES, ENVIRONMENTS }
