import BaseModel from './BaseModel';

// whether job is part time or full time
export default class Commitment extends BaseModel {
  title: string;
  
  constructor(title: string, id: string, slug: string) {
    super(id, slug);
    this.title = title;
  }
}