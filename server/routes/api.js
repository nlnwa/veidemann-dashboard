const express = require('express');
const router = express.Router();
const grpc = require('grpc');
const grpc_controller = grpc.load(__dirname + '/proto/controller.proto').broprox;
const seeds = require('./seeds');
const entities = require('./entities');
const browserscripts = require('./browserscript');
const browserconfigs = require('./browserconfig');
const crawlconfigs = require('./crawlconfig');
const crawljobs = require('./crawljob');
const schedule = require('./schedule');
const politenessconfig = require('./politenessconfig');
const path = require('path');
const users = require('./users');

require('dotenv').config();

console.warn('gRPC: Using: ' + process.env.grpc_controller);
client = new grpc_controller.Controller(process.env.grpc_controller, grpc.credentials.createInsecure());

/* GET api listing. */

router.get('/', (req, res) => {
  res.send("api works!");
});

router.get('/searchentities/name=:name', entities.searchCrawlEntities);
router.get('/entities', entities.listCrawlEntities);
router.post('/entities', entities.saveCrawlEntities);
router.get('/entities/:id', entities.getCrawlEntities);
router.put('/entities/:id', entities.updateCrawlEntities);
router.delete('/entities/:id', entities.deleteCrawlEntities);

router.get('/users', users.listUser);
router.post('/users', users.postUser);
router.get('/users/:id', users.getUser);
router.put('/users/:id', users.putUser);
router.delete('/users/:id', users.deleteUser);

router.get('/browserconfig', browserconfigs.listBrowserConfig);
router.post('/browserconfig', browserconfigs.saveBrowserConfig);
router.get('/browserconfig/:id', browserconfigs.getBrowserConfig);
router.put('/browserconfig/:id', browserconfigs.updateBrowserConfig);
router.delete('/browserconfig/:id', browserconfigs.deleteBrowserConfig);

router.get('/browserscript', browserscripts.listBrowserScripts);
router.post('/browserscript', browserscripts.saveBrowserScript);
router.get('/browserscript/:id', browserscripts.getBrowserScript);
router.put('/browserscript/:id', browserscripts.updateBrowserScript);
router.delete('/browserscript/:id', browserscripts.deleteBrowserScript);

router.get('/crawljob', crawljobs.listCrawlJobs);
router.post('/crawljob', crawljobs.saveCrawlJob);
router.get('/crawljob/:id', crawljobs.getCrawlJob);
router.put('/crawljob/:id', crawljobs.updateCrawlJob);
router.delete('/crawljob/:id', crawljobs.deleteCrawlJob);

router.get('/crawlconfig', crawlconfigs.listCrawlConfigs);
router.post('/crawlconfig', crawlconfigs.saveCrawlConfig);
router.get('/crawlconfig/:id', crawlconfigs.getCrawlConfig);
router.put('/crawlconfig/:id', crawlconfigs.updateCrawlConfig);
router.delete('/crawlconfig/:id', crawlconfigs.deleteCrawlConfig);

router.get('/schedule', schedule.listSchedule);
router.post('/schedule', schedule.saveSchedule);
router.get('/schedule/:id', schedule.getSchedule);
router.put('/schedule/:id', schedule.updateSchedule);
router.delete('/schedule/:id', schedule.deleteSchedule);

router.get('/politenessconfig', politenessconfig.listPolitenessConfigs);
router.post('/politenessconfig', politenessconfig.savePolitenessConfig);
router.get('/politenessconfig/:id', politenessconfig.getPolitenessConfig);
router.put('/politenessconfig/:id', politenessconfig.updatePolitenessConfig);
router.delete('/politenessconfig/:id', politenessconfig.deletePolitenessConfig);

router.get('/seedsearch/name=:name', seeds.seedSearch);
router.get('/seeds', seeds.listSeeds);
router.post('/seeds', seeds.saveSeed);
router.get('/seeds/:id', seeds.getSeed);
router.put('/seeds/:id', seeds.updateSeed);
router.delete('/seeds/:id', seeds.deleteSeed);

module.exports = router;
