import ToCountryEmoji from 'helpers/CountryEmojiConverter';
import BaseModel from './BaseModel';

// country information
export default class Country extends BaseModel {
  name: string;
  isoCode: string;
  
  constructor(name: string, isoCode: string, id: string, slug: string) {
    super(id, slug);
    this.name = name;
    this.isoCode = isoCode;
  }
}