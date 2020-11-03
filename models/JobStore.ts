import { createContext, useContext } from 'react';
import { Instance, types } from 'mobx-state-tree';
import { IAnyType } from 'mobx-state-tree/dist/internal';
import { City, Commitment, Company, Job, Remote, Tag } from './Job';
import { JobQueryBuilder } from 'queries/JobQueryBuilder';

export const JobStore = types.model('JobStore', {
  jobs: types.optional(types.array(Job), [])
}).actions((self) => ({
  push(job: Instance<typeof Job>) {
    return self.jobs.push(job);
  }
}));

export const ApplicationStore = types.model('ApplicationStore', {
  jobStore: types.optional(JobStore, {}),
  jobQuery: types.optional(JobQueryBuilder, {}),
});

const ApplicationContext = createContext<Instance<typeof ApplicationStore> | null>(null);

export const ApplicationContextProvider = ApplicationContext.Provider;
export function useAppJobsStore() {
  const store = useContext(ApplicationContext)?.jobStore;
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

export function useJobQueryStore() {
  const store = useContext(ApplicationContext)?.jobQuery;
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

export type QueryFilterStore = {
  cities: Instance<typeof City>[],
  commitments: Instance<typeof Commitment>[],
  companies: Instance<typeof Company>[],
  remotes: Instance<typeof Remote>[],
  tags: Instance<typeof Tag>[],
};

const queryFilterStoreValue: QueryFilterStore = {
  cities: [],
  commitments: [],
  companies: [],
  remotes: [],
  tags: []
}

export function useAppQueryFilterStore() {
  return queryFilterStoreValue;
}

function toUniqueArray<T extends Instance<IAnyType>>(originalArray: T[], equal: ((item1: T, item2: T) => boolean)) {
  return originalArray.filter((value, index, array) => {
    return array.findIndex(cmp => equal(cmp, value)) === index;
  });
}

export function toApplicationStore(jobs: Instance<typeof JobStore>) {
  const tags = toUniqueArray<Instance<typeof Tag>>(jobs.jobs.flatMap(job => job.tags), (tag1, tag2) => tag1.id == tag2.id);
  queryFilterStoreValue.tags = tags.sort((tag1, tag2) => tag1.name.localeCompare(tag2.name));
  return ApplicationStore.create({
    jobStore: jobs
  });
}