import { PhotoappDesktopClientPage } from './app.po';

describe('photoapp-desktop-client App', function() {
  let page: PhotoappDesktopClientPage;

  beforeEach(() => {
    page = new PhotoappDesktopClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
