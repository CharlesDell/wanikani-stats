export default {};

class Strings {
  private static _instance: Strings;

  private constructor() {
    //...
  }

  public static get Instance() {
    return (this._instance ??= new this());
  }
}
