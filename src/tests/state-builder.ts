// tslint:disable:max-classes-per-file
import { FetchDocumentNode } from "api/fetch-document"
import { AppState } from "root-reducer"
import { BookmarksState } from "state/bookmarks"
import {
  BookmarksDataState,
  BookmarksNode,
  initialDataState,
} from "state/bookmarks/data"
import { bookmarksImportInitState } from "state/bookmarks/import"
import { BookmarksSearchState, initSearchState } from "state/bookmarks/search"
import { BookmarksTreeState, initTreeState } from "state/bookmarks/tree"
import { initViewState } from "state/view"

const initialAppState: AppState = {
  bookmarks: {
    data: initialDataState,
    search: initSearchState,
    tree: initTreeState,
    import: bookmarksImportInitState,
  },
  view: initViewState,
}

export class AppStateBuilder {
  constructor(protected state = initialAppState) {}

  public withBookmarks(nodes: FetchDocumentNode[]) {
    return this.withBookmarksData({
      error: undefined,
      loading: false,
      nodes,
    })
  }
  public withSearchTerm(term: string) {
    return this.withBookmarksSearch({
      searchTerm: term,
      selectedIndex: 0,
    })
  }

  public get() {
    return this.state
  }
  public withBookmarksTreeState(state: Partial<BookmarksTreeState>) {
    return this.withBookmarksState({
      ...this.state.bookmarks,
      tree: {
        ...this.state.bookmarks.tree,
        ...state,
      },
    })
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
