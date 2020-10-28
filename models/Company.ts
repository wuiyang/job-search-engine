import BaseModel from './BaseModel';

// city information, one country has one or many cities
export default class Company extends BaseModel {
  name: string;
  websiteUrl: string;
  logoUrl: string;
  twitter: string;
  
  constructor(name: string, websiteUrl: string, logoUrl: string, twitter: string, id: string, slug: string) {
    super(id, slug);
    this.name = name;
    this.websiteUrl = websiteUrl;
    this.logoUrl = logoUrl;
    this.twitter = twitter;
  }
}