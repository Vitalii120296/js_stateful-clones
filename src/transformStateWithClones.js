'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // const actionsCopy = actions;
  const stateHistory = [];
  const stateCopy = { ...state };

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
        for (const propertie in stateCopy) {
          delete stateCopy[propertie];
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
