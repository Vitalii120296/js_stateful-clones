'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = structuredClone(state);

  for (const key of actions) {
    switch (key.type) {
      case `addProperties`: {
        Object.assign(stateCopy, key.extraData);

        const newObj = structuredClone(stateCopy);

        stateHistory.push(newObj);
        break;
      }

      case `removeProperties`: {
        for (const propertie of key.keysToRemove) {
          delete stateCopy[propertie];
        }

        const newObj = structuredClone(stateCopy);

        stateHistory.push(newObj);
        break;
      }

      case `clear`: {
        for (const property in stateCopy) {
          delete stateCopy[property];
        }

        const newObj = structuredClone(stateCopy);

        stateHistory.push(newObj);
        break;
      }

      default:
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
