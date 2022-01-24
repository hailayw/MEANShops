export class Shop {
  constructor (
      public name: String,
      public _id?: String,
      public category?: String,
      public established?: Number,
      public items?: {
          name: string,
          department: string
      }
  ){}
}
