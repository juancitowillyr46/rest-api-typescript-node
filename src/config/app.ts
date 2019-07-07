import dotenv from "dotenv";
dotenv.config();

class ConfigurationApp {
  private port: any;
  private db: any;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.db = process.env.DB_CONNECT;
  }

  public getPort() {
    return this.port;
  }

  public getConnectionString() {
    return this.db;
  }

  public getJwtTokenSecret(): string {
    return <string>process.env.JWT_SECRET;
  }
}
const config = new ConfigurationApp();

export default config;
