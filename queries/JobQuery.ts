import gql from 'graphql-tag';
import { Instance } from 'mobx-state-tree';
import { Job } from 'models/Job';
import { JobStore } from 'models/JobStore';

const JOB_TYPE = `
    id
    slug
    title
    commitment {
      id
      slug
      title
    }
    cities {
      id
      slug
      name
      # country information are gathered through cities
      # as job.countries are mostly empty
      country {
        id
        slug
        name
        isoCode
      }
    }
    remotes {
      id
      slug
      name
    }
    description
    applyUrl
    company {
      id
      slug
      name
      websiteUrl
      logoUrl
      twitter
    }
    tags {
      id
      slug
      name
    }
    isPublished
    isFeatured
    postedAt
    createdAt
    updatedAt
`

export const JOB_DETAIL = gql`
query JobDetail (
  $companySlug: String!
  $jobSlug: String!
) {
  job (
    input: {
      companySlug: $companySlug
      jobSlug: $jobSlug
    }
  ) {
    ${JOB_TYPE}
  }
}
`

export const JOB_LIST = gql`
query JobList {
  jobs {
    ${JOB_TYPE}
  }
}
`

function toJobInstance(jobData: any): Instance<typeof Job> {
  const { postedAt, createdAt, updatedAt, ...otherProperty } = jobData;
  return Job.create({
    ...otherProperty,
    postedAt: new Date(postedAt),
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  });
}

function toJobStore(jobsData: any[]): Instance<typeof JobStore> {
  const jobs = JobStore.create();
  jobsData.forEach(job => {
    jobs.push(toJobInstance(job));
  });
  return jobs;
}

export function getJobListJobs(data: any): Instance<typeof JobStore> {
  return toJobStore(data.jobs);
}
