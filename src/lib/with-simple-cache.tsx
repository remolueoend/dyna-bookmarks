import { Suspense } from "react"
import { SimpleCache, SimpleCacheInstance } from "simple-cache-provider"

export interface WithSimpleCacheProps {
  cache: SimpleCacheInstance
}

export function withSimpleCache<TProps>(
  C: React.ComponentType<TProps & WithSimpleCacheProps>,
): React.ComponentType<TProps> {
  return props => (
    <Suspense fallback={<span>Loading...</span>}>
      <SimpleCache.Consumer>
        {cache => <C cache={cache} {...props} />}
      </SimpleCache.Consumer>
    </Suspense>
  )
}
