export interface NotifyInterface{
  text?:string
  type:string
}

export class Notify implements NotifyInterface {
  text?:string;
  type:string;
  constructor (args:NotifyInterface) {
    this.text = args.text
    this.type = args.type
  }
}
