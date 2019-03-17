// tslint:disable
declare namespace SimpleCacheProvider {
  interface SimpleCacheInstance {}
  interface Resource<T> {
    read: (cache: SimpleCacheInstance) => T
  }

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
  ): SimpleCacheProvider.Resource<T>

  export const SimpleCache: SimpleCacheProvider.SimpleCacheNS
  export type SimpleCacheInstance = SimpleCacheProvider.SimpleCacheInstance
}
