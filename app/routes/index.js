import Route from '@ember/routing/route';

export default class IndexRoute extends Route {

  async _getAttributes(path) {
    const response = await fetch(path);
    const { data } = await response.json();

    return data.map(model => {
      let { attributes } = model;

      return {...attributes};
    });
  }

  async model() {
    const petitionAttributes = await this._getAttributes('/api/petitions.json');
    const donationAttributes = await this._getAttributes('/api/donations.json');
    const filmAttributes = await this._getAttributes('/api/films.json');

    return {
      petitions: petitionAttributes,
      donations: donationAttributes,
      films: filmAttributes,
    }
  }
}
