import BaseModel from './BaseModel';
import Country from './Country';

// city information, one country has one or many cities
export default class City extends BaseModel {
  name: string;
  country: Country;
  
  constructor(name: string, country: Country, id: string, slug: string) {
    super(id, slug);
    this.name = name;
    this.country = country;
  }
}