export class User {
  constructor(
    public login: string,
    public name: string,
    public followers: string,
    public membership: string,
    public url: string,
    public image: string,
    public repos: number
  ) {}
}
