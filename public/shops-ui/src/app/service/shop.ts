export class Shop {
  constructor (
    public name: string,
    public category: string,
    public established?: Number,
    public items?: {
        name: string,
        department: string
    },
    public _id?: string,
  ){}
}
