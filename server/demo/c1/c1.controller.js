'use strict';

import mongoose from 'mongoose';
import C1 from './c1.model';
import _ from 'lodash';


function setResponse(req,res){
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}


