export default class BaseModel {
  __typename: string;
  id: string;
  slug: string;

  constructor(id: string, slug: string) {
    this.id = id;
    this.slug = slug;
    this.__typename = '';
  }
}