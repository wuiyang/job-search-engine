import gql from 'graphql-tag';
import Job from 'models/Job';

const JOB_DETAIL = `
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

export const JOB_LIST = gql`
query JobList {
  jobs {
    ${JOB_DETAIL}
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
      ${JOB_DETAIL}
    }
  }
}
`
export function getJobListJobs(data: any): Job[] {
  return data.jobs
}

export function getJobQueryJobs(data: any): Job[] {
  return data.commitments[0].jobs
}

