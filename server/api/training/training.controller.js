/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/training              ->  index
 * POST    /api/training              ->  create
 * GET     /api/training/:id          ->  show
 * PUT     /api/training/:id          ->  update
 * DELETE  /api/training/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Training from './training.model';
// import EventEmitter from 'events';

// var eventEmitter = new EventEmitter();

function respondToEvent (){
  console.log('Responding to :', statusCode);
}
function respondToEventAndDoSomethingElse (){
  console.log('Responding to :', statusCode,' and doing something else');
}
// eventEmitter.on('show', respondToEvent);
// eventEmitter.on('show', respondToEventAndDoSomethingElse);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  // if(statusCode === 200) {eventEmitter.emit('show')}
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Trainings
export function index(req, res) {
  return Training.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Training from the DB
export function show(req, res) {
  return Training.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Training in the DB
export function create(req, res) {
  return Training.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Training in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Training.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Training from the DB
export function destroy(req, res) {
  return Training.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
