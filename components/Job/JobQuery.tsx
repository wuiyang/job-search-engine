import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';
import { Job } from 'models/Job';
import { JobStore, useAppJobsStore } from 'models/JobStore';
import JobView from './JobView';
import { Instance } from 'mobx-state-tree';
import AppFooter from 'components/AppFooter';
import { JobQueryBuilder, jobsQueryFilter } from 'queries/JobQueryBuilder';
import { baseStyles } from 'constants/Styles';

export type JobQueryProps = {
  variables?: Instance<typeof JobQueryBuilder>,
  navigateToJobPage: (job: Instance<typeof Job>) => void 
};

export default function JobQuery(props: JobQueryProps) {
  const { variables = JobQueryBuilder.create(), navigateToJobPage } = props;
  const jobStore: Instance<typeof JobStore> = useAppJobsStore() ?? JobStore.create();
  const filteredJobs = jobStore.jobs.filter(jobsQueryFilter(variables));

  return (
    <FlatList<Instance<typeof Job>>
      data={filteredJobs}
      renderItem={
        ({ item }) => (
          <JobView job={item} onPress={() => navigateToJobPage(item)} showTags={true} selectedTags={variables.where.tags_some} />
        )
      }
      keyExtractor={ (item) => item.id }
      contentContainerStyle={baseStyles.flexGrow}
      ListFooterComponentStyle={baseStyles.flexJustifyEnd}
      ListFooterComponent={AppFooter}
    />
  );
};

JobQuery.propTypes = {
  variables: PropTypes.object
};
