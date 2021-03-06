import configureStore from 'redux-mock-store';
import promise from 'redux-promise';
import axios from 'axios';
import moxios from 'moxios';

import * as actions from '../actions';

import { allDragonsMock, callHumanMock, getRandomDragonMock } from '../../__mocks__';

const middlewares = [promise];
const mockStore = configureStore(middlewares);

const ROOT_URL = `https://dragons-game-api.herokuapp.com`;

const testDragon = {
  type: 'red',
  level: 1,
  currenthp: 10,
  maxhp: 10,
  strength: 10,
  defense: 10,
  imageurl: 'fake.com/fake.png',
}

const testHuman = {
  type: 'whatever',
  level: 1,
  currenthp: 5,
  maxhp: 5,
  strength: 5,
  defense: 5,
  imageurl: 'fake.com/fake.png',
}

describe('action creator tests', () => {
  beforeEach(function () {
    moxios.install();
  })
  afterEach(function () {
    moxios.uninstall();
  })

  describe('callHuman', () => {

    it('returns { type: SPAWN_HUMAN and payload: {human} } after a successful axios call', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {human: callHumanMock},
        });
      });

      const expectedAction = { type: actions.SPAWN_HUMAN, payload: callHumanMock }

      const store = mockStore({ payload: {} })

      return store.dispatch(actions.callHuman(1)).then(() => {
        expect(store.getActions()[0]).toEqual(expectedAction);
      });
    });
  });

  describe('getAllDragons', () => {
    beforeEach(function () {
      moxios.install();
    })
    afterEach(function () {
      moxios.uninstall();
    })

    it('returns { type: GET_DRAGON_LIST and payload: {dragons} } after a successful axios call', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: allDragonsMock,
        });
      });

      const expectedAction = { type: actions.GET_DRAGON_LIST, payload: allDragonsMock }

      const store = mockStore({ payload: {} })

      return store.dispatch(actions.getAllDragons())
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });
  });


  describe('getRandomDragon', () => {
    beforeEach(function () {
      moxios.install();
    })
    afterEach(function () {
      moxios.uninstall();
    })

    it('returns { type: GET_RANDOM_DRAGON and payload: {randomDragon} } after a successful axios call', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {randomDragon: getRandomDragonMock },
        });
      });

      const expectedAction = { type: actions.GET_RANDOM_DRAGON, payload: getRandomDragonMock }

      const store = mockStore({ payload: {} })

      return store.dispatch(actions.getRandomDragon(1))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });
  })

  describe('clearFightingDragon', () => {
    test('it returns an object with a property of type', () => {
      expect(actions.clearFightingDragon()).toMatchObject({type: expect.anything()})
    })
  });

  describe('clearMergingDragons', () => {
    test('it returns an object with a property of type', () => {
      expect(actions.clearMergingDragons()).toMatchObject({type: expect.anything()})
    });
  });

  describe('clearNewDragon', () => {
    test('it returns an object with a property of type', () => {
      expect(actions.clearNewDragon()).toMatchObject({type: expect.anything()})
    });
  });

  describe('clearRandomDragon', () => {
    test('it returns an object with a property of type', () => {
      expect(actions.clearRandomDragon()).toMatchObject({type: expect.anything()})
    });
  });

  describe('enterFightMode', () => {
    test('it returns an object with the properties of type and payload', () => {
      expect(actions.enterFightMode(testDragon)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.objectContaining(testDragon)
        })
    });
  });

  describe('mergingDragon', () => {
    test('it returns an object with the properties of type and payload', () => {
      expect(actions.mergingDragon(testDragon)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.objectContaining(testDragon)
        })
    });
  });

  describe('removeFromUserDragons', () => {
    test('it returns an object with the properties of type and payload', () => {
      expect(actions.removeFromUserDragons(testDragon)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.objectContaining(testDragon)
        })
    });
  });

  describe('saveDragon', () => {
    test('it returns an object with the properties of type and payload', () => {
      expect(actions.saveDragon(testDragon)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.objectContaining(testDragon)
        })
    });
  });

  describe('saveHuman', () => {
    test('it returns an object with the properties of type and payload', () => {
      expect(actions.saveHuman(testHuman)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.objectContaining(testHuman)
        })
    });
  });

  describe('updateHumanHP', () => {
    test('it returns a number representing the hp passed in', () => {
      const hp = 2;
      expect(actions.updateHumanHP(2)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.anything()
        })
    });
  });

  describe('updateDragonHP', () => {
    test('it returns an action with the properties of type and payload', () => {
      const hp = 5;
      const injuredDragon = Object.assign(testDragon, {currenthp: 5});
      expect(actions.updateDragonHP(hp)).toMatchObject(
        {
          type: expect.anything(),
          payload: expect.anything()
        })
    });
  });

});
