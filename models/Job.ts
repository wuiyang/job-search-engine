import { createContext, useContext } from 'react';
import { Instance, types } from 'mobx-state-tree';
import toCountryEmoji from 'helpers/CountryEmojiConverter';
import { boolean, IAnyType, IModelType, IMSTArray } from 'mobx-state-tree/dist/internal';

// job tag
export const Tag = types.model('Tag', {
  id: types.identifier,
  slug: types.string,
  name: types.string
}).views((self) => {
  return {
    toString(): string {
      return self.name;
    }
  }
});

// determine remote type (currently only 1)
export const Remote = types.model('Remote', {
  id: types.identifier,
  slug: types.string,
  name: types.string
}).views((self) => {
  return {
    toString(): string {
      return self.name;
    }
  }
});

// whether job is part time or full time
export const Commitment = types.model('Commitment', {
  id: types.identifier,
  slug: types.string,
  title: types.string
}).views((self) => {
  return {
    toString(): string {
      return self.title;
    }
  }
});

// company info
export const Company = types.model('Company', {
  id: types.identifier,
  slug: types.string,
  name: types.string,
  websiteUrl: types.string,
  logoUrl: types.union(types.optional(types.string, ''), types.null),
  twitter: types.union(types.optional(types.string, ''), types.null)
}).views((self) => {
  return {
    toString(): string {
      return self.name;
    }
  }
});

// country information
export const Country = types.model('Country', {
  id: types.identifier,
  slug: types.string,
  name: types.string,
  isoCode: types.string
}).views((self) => {
  return {
    get countryEmoji(): string {
      return toCountryEmoji(self.isoCode);
    },
    toString(): string {
      return self.name;
    }
  }
});

// city information, one country has one or many cities
export const City = types.model('City', {
  id: types.identifier,
  slug: types.string,
  name: types.string,
  country: Country,
}).views((self) => {
  return {
    toString(): string {
      return self.name;
    }
  }
});

// whether job is part time or full time
export const Job = types.model('Job', {
  // basic information required for job list view
  id: types.identifier,
  slug: types.string,
  title: types.string,
  company: Company,
  cities: types.optional(types.array(City), []),
  remotes: types.optional(types.array(Remote), []),
  isPublished: types.boolean,
  isFeatured: types.optional(types.maybeNull(types.boolean), false),

  // queryable info
  commitment: Commitment,
  tags: types.optional(types.array(Tag), []),

  // detailed info
  description: types.string,
  applyUrl: types.string,

  postedAt: types.Date,
  createdAt: types.Date,
  updatedAt: types.Date
});

export const JobStore = types.model('JobStore', {
  jobs: types.optional(types.array(Job), [])
}).actions((self) => ({
  push(job: Instance<typeof Job>) {
    return self.jobs.push(job);
  }
}));

export const ApplicationStore = types.model('ApplicationStore', {
  jobStore: types.optional(JobStore, {}),
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