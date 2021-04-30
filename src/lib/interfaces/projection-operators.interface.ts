import type { QueryOperators } from './query-operators.interface'

/**
 * @file Interface - ProjectionOperators
 * @module lib/interfaces/ProjectionOperators
 */

/**
 * [Projection Selector][1] operators.
 *
 * [1]: https://docs.mongodb.com/manual/reference/operator/query/#projection-operators
 */
export interface ProjectionOperators {
  /**
   * Limits the contents of an <array> field from the query results to contain
   * only the first element matching the specified condition.
   */
  $elemMatch?: QueryOperators['$elemMatch']

  /**
   * Specifies the number of elements in an array to return in the query result.
   */
  $limit?: number
}
