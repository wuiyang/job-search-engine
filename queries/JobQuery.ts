import gql from 'graphql-tag';
import { Instance } from 'mobx-state-tree';
import { City, Commitment, Company, Country, Job, JobStore, Remote, Tag } from 'models/Job';

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

export const JOB_QUERY = gql`
query JobQuery (
  $where: JobWhereInput
  $orderBy: JobOrderByInput
  $skip: Int    # same as OFFSET for SQL
  $first: Int   # same as LIMIT for SQL
) {
  # there is no direct query to jobs which provides where query
  # hence search through commitments
  # commitments can be replaced with other non-null properties
  commitments {
    jobs (
      where: $where
      orderBy: $orderBy
      skip: $skip
      first: $first
    ) {
      ${JOB_TYPE}
    }
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
  console.log(jobs);
  return jobs;
}

export function getJob(data: any): Instance<typeof Job> {
  return toJobInstance(data.job);
}

export function getJobListJobs(data: any): Instance<typeof JobStore> {
  return toJobStore(data.jobs);
}

export function getJobQueryJobs(data: any): Instance<typeof JobStore> {
  return toJobStore(data.commitments.jobs);
}

