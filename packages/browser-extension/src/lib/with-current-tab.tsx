import { Omit } from "ramda"
import { createResource } from "simple-cache-provider"
import { withSimpleCache } from "./with-simple-cache"

type PromiseType<T> = T extends Promise<infer U> ? U : unknown
type Unpacked<T> = T extends Array<infer U> ? U : T
type Tab = Unpacked<PromiseType<ReturnType<typeof browser.tabs.query>>>

export type CurrentTab = Pick<Tab, "title" | "url">

export interface WithCurrentTabProps {
  currentTab: CurrentTab
}

const getCurrentTab = createResource(async () => {
  const activeTabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })
  return activeTabs[0]
})

export function withCurrentTab<TProps extends WithCurrentTabProps>(
  C: React.ComponentType<TProps>,
): React.ComponentType<Omit<TProps, "currentTab">> {
  return withSimpleCache<Omit<TProps, "currentTab">>(({ cache, ...props }) => {
    const currentTab = getCurrentTab.read(cache)
    return <C {...props as any} currentTab={currentTab} />
  })
}
