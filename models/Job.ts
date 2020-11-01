import { Instance, types } from 'mobx-state-tree';
import toCountryEmoji from 'helpers/CountryEmojiConverter';

// job tag
export const Tag = types.model("Tag", {
  id: types.identifier,
  slug: types.string,
  name: types.string
});

// determine remote type (currently only 1)
export const Remote = types.model("Remote", {
  id: types.identifier,
  slug: types.string,
  name: types.string
});

// whether job is part time or full time
export const Commitment = types.model("Commitment", {
  id: types.identifier,
  slug: types.string,
  title: types.string
});

// company info
export const Company = types.model("Company", {
  id: types.identifier,
  slug: types.string,
  name: types.string,
  websiteUrl: types.string,
  logoUrl: types.union(types.optional(types.string, ""), types.null),
  twitter: types.union(types.optional(types.string, ""), types.null)
});

// country information
export const Country = types.model("Country", {
  id: types.identifier,
  slug: types.string,
  name: types.string,
  isoCode: types.string
}).views((self) => {
  return {
    get countryEmoji(): string {
      return toCountryEmoji(self.isoCode);
    }
  }
});

// city information, one country has one or many cities
export const City = types.model("City", {
  id: types.identifier,
  slug: types.string,
  name: types.string,
  country: Country,
});

// whether job is part time or full time
export const Job = types.model("Job", {
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

export const JobStore = types.model("JobStore", {
  jobs: types.optional(types.array(Job), [])
}).actions((self) => ({
  push(job: Instance<typeof Job>) {
    return self.jobs.push(job);
  }
}));