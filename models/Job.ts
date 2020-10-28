import BaseModel from './BaseModel';
import City from './City';
import Commitment from './Commitment';
import Company from './Company';
import Country from './Country';
import Remote from './Remote';
import Tag from './Tag';

// whether job is part time or full time
export default class Job extends BaseModel {
  // basic information required for job list view
  title: string;
  company: Company;
  cities: City[];
  remotes: Remote[];
  isPublished: boolean;
  isFeatured: boolean;

  // queryable info
  commitment: Commitment;
  tags: Tag[];

  // detailed info
  description: string;
  applyUrl: string;

  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(title: string, company: Company, cities: City[], 
              remotes: Remote[], description: string, commitment: Commitment,
              applyUrl: string, tags: Tag[], isPublished: boolean, 
              isFeatured: boolean, postedAt: Date, createdAt: Date, 
              updatedAt: Date, id: string, slug: string) {
    super(id, slug);
    this.title = title;
    this.commitment = commitment;
    this.cities = cities;
    this.remotes = remotes;
    this.description = description;
    this.applyUrl = applyUrl;
    this.company = company;
    this.tags = tags;
    this.isPublished = isPublished;
    this.isFeatured = isFeatured;

    this.postedAt = postedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}