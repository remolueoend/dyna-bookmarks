// tslint:disable
declare namespace SimpleCacheProvider {
  interface SimpleCacheInstance {}

  type SimpleCacheConsumer = React.ComponentType<{
    children: (cache: SimpleCacheInstance) => JSX.Element
  }>

  interface SimpleCacheNS {
    Consumer: SimpleCacheConsumer
  }
}

declare module "simple-cache-provider" {
  export function createResource<T>(
    resourceProvider: () => Promise<T>,
  ): (cache: SimpleCacheProvider.SimpleCacheInstance) => T

  export const SimpleCache: SimpleCacheProvider.SimpleCacheNS
  export type SimpleCacheInstance = SimpleCacheProvider.SimpleCacheInstance
}
