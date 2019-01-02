// tslint:disable:max-classes-per-file
import { AppState } from "root-reducer"
import { BookmarksState } from "state/bookmarks"
import {
  BookmarksDataState,
  BookmarksNode,
  initialDataState,
} from "state/bookmarks/data"
import { bookmarksImportInitState } from "state/bookmarks/import"
import { BookmarksSearchState, initSearchState } from "state/bookmarks/search"
import { initTreeState } from "state/bookmarks/tree"

const initialAppState: AppState = {
  bookmarks: {
    data: initialDataState,
    search: initSearchState,
    tree: initTreeState,
    import: bookmarksImportInitState,
  },
}

export class AppStateBuilder {
  constructor(protected state = initialAppState) {}

  public withBookmarks(nodeList: BookmarksNode[], rootNode: BookmarksNode) {
    return this.withBookmarksData({
      error: undefined,
      loading: false,
      nodeList,
      rootNode,
    })
  }
  public withSearchTerm(term: string) {
    return this.withBookmarksSearch({
      searchTerm: term,
    })
  }

  public get() {
    return this.state
  }

  protected withBookmarksState(state: BookmarksState) {
    return new AppStateBuilder({
      ...this.state,
      bookmarks: {
        ...this.state.bookmarks,
        ...state,
      },
    })
  }
  protected withBookmarksData(state: BookmarksDataState) {
    return this.withBookmarksState({
      ...this.state.bookmarks,
      data: {
        ...this.state.bookmarks.data,
        ...state,
      },
    })
  }
  protected withBookmarksSearch(state: BookmarksSearchState) {
    return this.withBookmarksState({
      ...this.state.bookmarks,
      search: {
        ...this.state.bookmarks.search,
        ...state,
      },
    })
  }
}

export const appState = new AppStateBuilder()
