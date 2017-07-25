import { Angular4CrudPage } from './app.po';

describe('angular4-crud App', () => {
  let page: Angular4CrudPage;

  beforeEach(() => {
    page = new Angular4CrudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
