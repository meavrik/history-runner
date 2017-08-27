import { HistoryRunnerPage } from './app.po';

describe('history-runner App', () => {
  let page: HistoryRunnerPage;

  beforeEach(() => {
    page = new HistoryRunnerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
