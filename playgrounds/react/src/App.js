import 'instantsearch.css/themes/algolia-min.css'
import React from 'react'
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  SortBy,
  Snippet,
} from 'react-instantsearch-dom'

import './App.css'
import { instantMeiliSearch } from '../../../src/index'

const searchClient = instantMeiliSearch(
  'https://integration-demos.meilisearch.com',
  '99d1e034ed32eb569f9edc27962cccf90b736e4c5a70f7f5e76b9fab54d6a185',
  {
    paginationTotalHits: 60,
    primaryKey: 'id',
  }
)

const App = () => (
  <div className="ais-InstantSearch">
    <h1>Meilisearch + React InstantSearch</h1>
    <h2>
      Search in Steam video games{' '}
      <span role="img" aria-label="emoji">
        🎮
      </span>
    </h2>
    <p>
      This is not the official Steam dataset but only for demo purpose. Enjoy
      searching with Meilisearch!
    </p>
    <InstantSearch indexName="steam-video-games" searchClient={searchClient}>
      <Stats />
      <div className="left-panel">
        <ClearRefinements />
        <SortBy
          defaultRefinement="steam-video-games"
          items={[
            { value: 'steam-video-games', label: 'Relevant' },
            {
              value: 'steam-video-games:recommendationCount:desc',
              label: 'Most Recommended',
            },
            {
              value: 'steam-video-games:recommendationCount:asc',
              label: 'Least Recommended',
            },
          ]}
        />
        <h2>Genres</h2>
        <RefinementList attribute="genres" />
        <h2>Players</h2>
        <RefinementList attribute="players" />
        <h2>Platforms</h2>
        <RefinementList attribute="platforms" />
        <h2>Misc</h2>
        <RefinementList attribute="misc" />
        <Configure
          hitsPerPage={6}
          attributesToSnippet={['description:50']}
          snippetEllipsisText={'...'}
        />
      </div>
      <div className="right-panel">
        <SearchBox />
        <InfiniteHits hitComponent={Hit} />
      </div>
    </InstantSearch>
  </div>
)

const Hit = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <div className="hit-name">
        <Highlight attribute="genres" hit={hit} />
      </div>
      <img src={hit.image} align="left" alt={hit.name} />
      <div className="hit-name">
        <Snippet attribute="description" hit={hit} />
      </div>
      <div className="hit-info">
        <b>price:</b> {hit.price}
      </div>
      <div className="hit-info">
        <b>release date:</b> {hit.releaseDate}
      </div>
      <div className="hit-info">
        <b>Recommended:</b> {hit.recommendationCount}
      </div>
    </div>
  )
}

export default App
