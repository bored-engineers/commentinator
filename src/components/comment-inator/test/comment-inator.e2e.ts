import { newE2EPage } from '@stencil/core/testing';

describe('comment-inator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<comment-inator></comment-inator>');

    const element = await page.find('comment-inator');
    expect(element).toHaveClass('hydrated');
  });
});
