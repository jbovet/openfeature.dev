import React from 'react';
import Layout from '@theme/Layout';
import { Configure, Hits, InstantSearch, RefinementList, SearchBox, ToggleRefinement } from 'react-instantsearch';
import { createIndex, getSearchClient } from 'instantsearch-itemsjs-adapter';

import { SEARCH_ITEMS_PER_PAGE } from '../datasets/constants';
import { ECOSYSTEM } from '../datasets';

import Pagination from '../partials/ecosystem/pagination';
import ClearFilters from '../partials/ecosystem/clear-filters';
import NoResults from '../partials/ecosystem/no-results';
import NoResultsBoundary from '../partials/ecosystem/no-results-boundary';
import PageIllustration from '../partials/page-illustration';
import Hit from '../partials/ecosystem/hit';
import ScrollTo from '../partials/ecosystem/scroll-to';

import type { ItemsJsOptions } from 'instantsearch-itemsjs-adapter/lib/itemsjsInterface';
import type { InstantSearchOptions } from 'instantsearch.js';

const VENDORS_SHOWN_AS_FACET = 30;
const TECHNOLOGIES_SHOWN_AS_FACET = 20;

const options: ItemsJsOptions = {
  searchableFields: ['title', 'description', 'allTechnologies'],
  query: '',
  aggregations: {
    type: {
      title: 'types',
      size: 5,
      hide_zero_doc_count: true,
      conjunction: false,
    },
    category: {
      title: 'category',
      size: 2,
      conjunction: true,
    },
    allTechnologies: {
      title: 'technologies',
      searchInField: ['technology', 'parentTechnology'],
      size: TECHNOLOGIES_SHOWN_AS_FACET,
      hide_zero_doc_count: true,
      conjunction: false,
    },
    vendor: { title: 'vendors', size: VENDORS_SHOWN_AS_FACET, conjunction: false, hide_zero_doc_count: true },
    vendorOfficial: { title: 'official', size: 2, conjunction: true },
  },
};

const index = createIndex(ECOSYSTEM, options);
// Casting as the items.js implementation has slightly different facet types.
// This doesn't appear to have any negative effects.
const searchClient = getSearchClient(index) as InstantSearchOptions['searchClient'];

export default function Ecosystem() {
  return (
    <Layout title="Ecosystem" description="OpenFeature Ecosystem">
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        routing={true}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Configure hitsPerPage={SEARCH_ITEMS_PER_PAGE} />
        <ScrollTo>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <main className="grow">
              <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
                <PageIllustration />
              </div>
              <div className="relative pt-12 pb-8">
                <div className="max-w-3xl mx-auto text-center pb-4">
                  <h2 className="text-3xl text-semibold dark:fill-white fill-gray-700 mb-8 sm:px-2">
                    Discover the OpenFeature Ecosystem
                  </h2>
                  <div className="flex justify-center">
                    <SearchBox
                      autoFocus
                      placeholder={'Search SDKs, hooks, and providers...'}
                      classNames={{
                        root: 'w-screen md:w-[512px] px-4',
                        input:
                          'w-full h-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                        submit: 'hidden',
                        reset: 'hidden',
                        resetIcon: 'hidden',
                        loadingIcon: 'hidden',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="container grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className="hidden lg:block">
                  <div className="flex justify-between">
                    <span className="text-xl font-medium text-content">Filter</span>
                    <ClearFilters />
                  </div>
                  <div className="border-0 border-solid border-t border-gray-200 py-4">
                    <span className="font-medium text-content">Type</span>
                    <RefinementList
                      attribute="type"
                      sortBy={['count:desc']}
                      classNames={{
                        count:
                          'ml-2 px-2 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
                        list: 'list-none m-0 p-0',
                        checkbox: 'border-solid h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
                        labelText: 'ml-3 text-sm text-content',
                      }}
                    />
                  </div>
                  <div className="border-0 border-solid border-t border-gray-200 py-4">
                    <span className="font-medium text-content">Category</span>
                    <RefinementList
                      attribute="category"
                      sortBy={['count:desc']}
                      classNames={{
                        count:
                          'ml-2 px-2 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
                        list: 'list-none m-0 p-0',
                        checkbox: 'border-solid h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
                        labelText: 'ml-3 text-sm text-content',
                      }}
                    />
                  </div>
                  <div className="border-0 border-solid border-t border-gray-200 py-4">
                    <span className="font-medium text-content">Technology</span>
                    <RefinementList
                      attribute="allTechnologies"
                      sortBy={['count:desc']}
                      limit={TECHNOLOGIES_SHOWN_AS_FACET}
                      classNames={{
                        count:
                          'ml-2 px-2 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
                        list: 'list-none m-0 p-0',
                        checkbox: 'border-solid h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
                        labelText: 'ml-3 text-sm text-content',
                      }}
                    />
                  </div>
                  <div className="border-0 border-solid border-t border-gray-200 py-4">
                    <span className="font-medium text-content">Vendor</span>
                    <RefinementList
                      attribute="vendor"
                      sortBy={['count:desc']}
                      limit={VENDORS_SHOWN_AS_FACET}
                      classNames={{
                        count:
                          'ml-2 px-2 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
                        list: 'list-none m-0 p-0',
                        checkbox: 'border-solid h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
                        labelText: 'ml-3 text-sm text-content',
                      }}
                    />
                  </div>
                  <div className="border-0 border-solid border-t border-gray-200 py-4">
                    <span className="font-medium text-content">Support level</span>
                    <ToggleRefinement
                      attribute="vendorOfficial"
                      label="Vendor supported"
                      classNames={{
                        checkbox: 'border-solid h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
                        labelText: 'ml-3 text-sm text-content',
                      }}
                    />
                  </div>
                </div>
                <div className="lg:col-span-4 z-10">
                  <NoResultsBoundary fallback={<NoResults />}>
                    <Hits
                      classNames={{ list: 'flex flex-wrap gap-8 justify-center md:justify-start', item: 'list-none' }}
                      hitComponent={Hit}
                    />
                    <Pagination />
                  </NoResultsBoundary>
                </div>
              </div>
            </main>
          </div>
        </ScrollTo>
      </InstantSearch>
    </Layout>
  );
}
