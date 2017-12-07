export class DynamicAuthConfig {
  issuer?: string;
  requireHttps: boolean;

  constructor() {
    this.requireHttps = false;
  }
}
