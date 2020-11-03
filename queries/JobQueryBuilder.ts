import { IAnyType, Instance, types } from 'mobx-state-tree';
import { City, Commitment, Company, Job, Remote, Tag } from 'models/Job';
import { JobDescriptionParam } from 'types';

export const IdQueryInput = types.model('IdQueryInput', {
  id_in: types.array(types.string)  
}).actions((self) => ({
  addToArray(id: string) {
    self.id_in.push(id);
  },
  removeFromArray(id: string) {
    const index = self.id_in.indexOf(id);
    self.id_in.splice(index, 1);
  },
  clearArray() {
    self.id_in.clear();
  },
  has(id: string) {
    return self.id_in.includes(id);
  }
})).actions((self) => ({
  toggle(id: string) {
    if (self.id_in.includes(id)) {
      self.removeFromArray(id);
    } else {
      self.addToArray(id);
    }
  }
}));


// separating to get keys of properties
export const JobWhereIdInput = {
  cities_some: types.maybeNull(IdQueryInput),
  commitment: types.maybeNull(IdQueryInput),
  company: types.maybeNull(IdQueryInput),
  remotes_some: types.maybeNull(IdQueryInput),
  tags_some: types.maybeNull(IdQueryInput),
};

// other non id query
export const JobWhereInput = types.model('JobWhereInput', {
  ...JobWhereIdInput,
  title_contains: types.maybeNull(types.string),
  postedAt_gte: types.maybeNull(types.Date),
});

export const OrderBy = [
  'title_ASC',
  'title_DESC',
  'postedAt_ASC',
  'postedAt_DESC'
];

export const JobQueryBuilder = types.model({
  where: types.optional(JobWhereInput, {}),
  orderBy: types.optional(types.enumeration('OrderBy', OrderBy), OrderBy[3]),
}).actions((self) => ({
  clearArray(propertyName: keyof typeof JobWhereIdInput) {
    // set to undefined to remove query
    self.where[propertyName] = null;
  },
  ensureArray(propertyName: keyof typeof JobWhereIdInput): Instance<typeof IdQueryInput> {
    // ensure IdQueryInput is always defined by setting default early on
    let output: Instance<typeof IdQueryInput> = self.where[propertyName] ?? IdQueryInput.create({ id_in: [] });

    // if where query is empty, set to default
    if (self.where[propertyName] == null) {
      self.where[propertyName] = output;
    }
    return output;
  },
  setArray(propertyName: keyof typeof JobWhereIdInput, values: Instance<typeof IdQueryInput>) {
    self.where[propertyName] = values;
  }
})).actions((self) => ({
  addToArray(propertyName: keyof typeof JobWhereIdInput, id: string) {
    const idQuery: Instance<typeof IdQueryInput> = self.ensureArray(propertyName);
    idQuery.addToArray(id);
  },
  removeFromArray(propertyName: keyof typeof JobWhereIdInput, id: string) {
    const idQuery: Instance<typeof IdQueryInput> = self.ensureArray(propertyName);
    idQuery.removeFromArray(id);
  }
})).actions((self) => ({
  sortBy(orderBy: string) {
    self.orderBy = orderBy;
  },
  setJobTitle(title: string) {
    self.where.title_contains = title;
  },
  postedAfter(date: Date) {
    self.where.postedAt_gte = date;
  },
  addCity(city: Instance<typeof City>) {
    self.addToArray('cities_some', city.id);
  },
  removeCity(city: Instance<typeof City>) {
    self.removeFromArray('cities_some', city.id);
  },
  clearCity() {
    self.clearArray('cities_some');
  },
  addCommitment(commitment: Instance<typeof Commitment>) {
    self.addToArray('commitment', commitment.id);
  },
  removeCommitment(commitment: Instance<typeof Commitment>) {
    self.removeFromArray('commitment', commitment.id);
  },
  addCompany(company: Instance<typeof Company>) {
    self.addToArray('company', company.id);
  },
  removeCompany(company: Instance<typeof Company>) {
    self.removeFromArray('company', company.id);
  },
  addRemote(remote: Instance<typeof Remote>) {
    self.addToArray('remotes_some', remote.id);
  },
  removeRemote(remote: Instance<typeof Remote>) {
    self.removeFromArray('remotes_some', remote.id);
  },
  addTag(tag: Instance<typeof Tag>) {
    self.addToArray('tags_some', tag.id);
  },
  removeTag(tag: Instance<typeof Tag>) {
    self.removeFromArray('tags_some', tag.id);
  },
  setTagsQuery(tagsQuery: Instance<typeof IdQueryInput>) {
    self.setArray('tags_some', tagsQuery);
  }
}));

export function jobsQueryFilter(variables: Instance<typeof JobQueryBuilder>) {
  const titleCheck = (job: Instance<typeof Job>) => {
    const query = variables.where.title_contains?.toUpperCase() ?? '';
    const title = job.title.toUpperCase()
    return title.includes(query);
  };

  const tagsCheck = (job: Instance<typeof Job>) => {
    const queriesId = variables.where.tags_some?.id_in ?? [];
    const tags = job.tags;
    const hasQuery = queriesId.some(queryId => tags.find(tag => tag.id == queryId));
    return hasQuery || queriesId.length === 0;
  };
  
  return (job: Instance<typeof Job>) => {
    if (!titleCheck(job)) {
      return false;
    }
    if (!tagsCheck(job)) {
      return false;
    }
    return true;
  }
}

export function jobQueryFinder(companySlug: string, jobSlug: string) {
  return (job: Instance<typeof Job>) => {
    return job.company.slug === companySlug && job.slug === jobSlug;
  }
}
