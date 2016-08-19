/**
 * Training model events
 */

'use strict';

import {EventEmitter} from 'events';
import Training from './training.model';
var TrainingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TrainingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  console.log('Register event: ', e)
  Training.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TrainingEvents.emit(event + ':' + doc._id, doc);
    TrainingEvents.emit(event, doc);
  }
}

export default TrainingEvents;
