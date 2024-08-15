export class Cancel{
  reason?: string
  constructor(reason?:string) {
    this.reason = reason
  }
}

export function isCancel(value:any):boolean{
  return value instanceof Cancel
}

