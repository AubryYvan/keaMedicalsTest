import { Sequelize, Model } from 'sequelize-typescript';
import fs from 'fs'
import path from 'path';

var basename  = path.basename(__filename);
var env       = process.env['NODE_ENV'] || 'development';
var config    = require(__dirname + '/../../config/database.json')[env];

const initConfig = () => {
  config.models = loadModels();

  return config;
}

const loadModels = () => {

  let models: Model[] = [];

  fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file: string) => {
    models.push(require(path.join(__dirname, file)).default);
  });

  return models;
}

export const sequelize = new Sequelize(initConfig());