import BaseModel from './BaseModel';

// job tagging
export default class Tag extends BaseModel {
  name: string;
  
  constructor(name: string, id: string, slug: string) {
    super(id, slug);
    this.name = name;
  }
}