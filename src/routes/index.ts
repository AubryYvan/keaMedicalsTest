/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import fs from 'fs'
import path from 'path';
import { Application } from "express";
var basename  = path.basename(__filename);

/**
 * load all routes for defined in project
 */
export = (app: Application) => {
    fs
    .readdirSync(__dirname)
    .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file: string) => {
        let route = require(path.join(__dirname, file));
        route.default.config(app);
    });
}