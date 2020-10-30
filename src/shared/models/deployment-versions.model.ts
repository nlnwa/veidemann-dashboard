export class DeploymentVersions {
  veidemann?: string;
  veidemannCache?: string;
  veidemannContentWriter?: string;
  veidemannController?: string;
  veidemannDnsResolver?: string;
  veidemannFrontier?: string;
  veidemannBrowserController?: string;
  veidemannRecorderProxy?: string;
  veidemannHealthCheckApi?: string;
  veidemannMetrics?: string;
  veidemannOoshandler?: string;
  veidemannRobotsEvaluatorService?: string;
  veidemannWarcValidator?: string;
  veidemannWarcValidatorApi?: string;
  veidemannDbInitializer?: string;
  rethinkdbBackup?: string;

  constructor({
                veidemann = '',
                veidemannCache = '',
                veidemannContentWriter = '',
                veidemannController = '',
                veidemannDnsResolver = '',
                veidemannFrontier = '',
                veidemannBrowserController = '',
                veidemannRecorderProxy = '',
                veidemannHealthCheckApi = '',
                veidemannMetrics = '',
                veidemannOoshandler = '',
                veidemannRobotsEvaluatorService = '',
                veidemannWarcValidator = '',
                veidemannDbInitializer = '',
                rethinkdbBackup = '',
              }: Partial<DeploymentVersions> = {}) {
    this.veidemann = veidemann;
    this.veidemannCache = veidemannCache;
    this.veidemannContentWriter = veidemannContentWriter;
    this.veidemannController = veidemannController;
    this.veidemannDnsResolver = veidemannDnsResolver;
    this.veidemannFrontier = veidemannFrontier;
    this.veidemannBrowserController = veidemannBrowserController;
    this.veidemannRecorderProxy = veidemannRecorderProxy;
    this.veidemannHealthCheckApi = veidemannHealthCheckApi;
    this.veidemannMetrics = veidemannMetrics;
    this.veidemannOoshandler = veidemannOoshandler;
    this.veidemannRobotsEvaluatorService = veidemannRobotsEvaluatorService;
    this.veidemannWarcValidator = veidemannWarcValidator;
    this.veidemannDbInitializer = veidemannDbInitializer;
    this.rethinkdbBackup = rethinkdbBackup;
  }
}
