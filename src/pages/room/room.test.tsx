import * as React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';

import {Offer, Review} from '../../interfaces';
import {city} from '../../types';
import {Room} from './room';


const mockStore = configureStore([]);

const cities: city[] = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const offers: Offer[] = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    previewImage: `img/apartment-01.jpg`,
    images: [`img/apartment-02.jpg`, `img/apartment-03.jpg`],
    title: `Beautiful & luxurious studio at great location`,
    isFavorite: false,
    isPremium: false,
    rating: 1.8,
    type: `apartment`,
    bedrooms: 3,
    maxAdults: 4,
    price: 100,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      id: 3,
      isPro: true,
      name: `Angelina`,
      avatarUrl: `img/avatar-angelina.jpg`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  }
];

const nearby: Offer[] = [
  {
    id: 2,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    previewImage: `img/apartment-02.jpg`,
    images: [`img/apartment-01.jpg`, `img/apartment-03.jpg`],
    title: `Beautiful & luxurious studio at great location`,
    isFavorite: false,
    isPremium: false,
    rating: 2.8,
    type: `room`,
    bedrooms: 2,
    maxAdults: 4,
    price: 140,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      id: 3,
      isPro: true,
      name: `Angelina`,
      avatarUrl: `img/avatar-angelina.jpg`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  },
  {
    id: 3,
    city: {
      name: `Paris`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    previewImage: `img/apartment-02.jpg`,
    images: [`img/apartment-01.jpg`, `img/apartment-03.jpg`],
    title: `Beautiful & luxurious studio at great location`,
    isFavorite: false,
    isPremium: false,
    rating: 4.8,
    type: `room`,
    bedrooms: 2,
    maxAdults: 4,
    price: 120,
    goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    host: {
      id: 3,
      isPro: true,
      name: `Angelina`,
      avatarUrl: `img/avatar-angelina.jpg`
    },
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  }
];

const comments: Review[] = [
  {
    id: 1,
    user: {
      id: 4,
      isPro: false,
      name: `Max`,
      avatarUrl: `/img/avatar-max.jpg`
    },
    rating: 4,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`
  }
];

it(`<Room /> should be rendered`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const store = mockStore({
    user: {
      isAuthorized: true,
      email: `jztenk@gmail.com`
    },
    cities: {
      data: cities,
      current: `Amsterdam`
    },
    offers: {
      sorting: `id`,
      data: offers,
      nearby,
      current: null,
      comments
    },
    request: {
      type: ``,
      status: ``,
      id: null
    }
  });

  const tree = mount(
      <Provider store={store}>
        <Router>
          <Room
            match={{params: {id: `1`}}}
            city={`Amsterdam`}
            offers={offers}
            offer={offers[0]}
            status={``}
            setOffer={jest.fn()}
            setCity={jest.fn()}
            setBookmark={jest.fn()}
            getComments={() => comments}
            getNearbyOffers={() => nearby}
          />
        </Router>
      </Provider>, {attachTo: div});

  expect(tree.getDOMNode()).toMatchSnapshot();
});
