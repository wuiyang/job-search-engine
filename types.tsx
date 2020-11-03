import { Instance } from "mobx-state-tree";
import { IdQueryInput, JobQueryBuilder } from "queries/JobQueryBuilder";

export type JobDescriptionParam = {
  companySlug: string,
  jobSlug: string,
};

export type FilterParam = {
  filterOptions: Instance<typeof JobQueryBuilder>,
  setFilterOptions: React.Dispatch<React.SetStateAction<Instance<typeof JobQueryBuilder>>>
};

export type RootStackParamList = {
  Search: undefined;
  Filter: FilterParam;
  JobDescription: JobDescriptionParam;
  NotFound: undefined;
};
