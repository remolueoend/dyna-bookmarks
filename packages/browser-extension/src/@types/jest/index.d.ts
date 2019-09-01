// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    /**
     * Returns true if the given node ref is equal to the current one.
     * Uses NodeRef.equals to compare node references.
     *
     * @param {R} nodeRef A NodeRef instance to compare with the current one.
     * @returns {CustomMatcherResult}
     * @memberof Matchers
     */
    toEqualNodeRef(nodeRef: R): CustomMatcherResult
  }
}
