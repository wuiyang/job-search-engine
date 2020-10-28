import BaseModel from './BaseModel';

// determine remote type (currently only 1)
export default class Remote extends BaseModel {
  name: string;
  
  constructor(name: string, id: string, slug: string) {
    super(id, slug);
    this.name = name;
  }
}