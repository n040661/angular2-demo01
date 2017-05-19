import { Ng12Page } from './app.po';

describe('ng12 App', function() {
  let page: Ng12Page;

  beforeEach(() => {
    page = new Ng12Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
