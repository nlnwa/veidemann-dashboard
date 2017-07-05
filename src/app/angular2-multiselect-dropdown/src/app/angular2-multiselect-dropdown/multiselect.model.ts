export class ListItem {
  id: Number;
  itemName: String;
  description: String;
}
export class MyException {
  status: number;
  body: any;

  constructor(status: number, body: any) {
    this.status = status;
    this.body = body;
  }

}
