import { newSpecPage } from '@stencil/core/testing';
import { CommentInator } from '../comment-inator';

describe('comment-inator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CommentInator],
      html: `<comment-inator></comment-inator>`,
    });
    expect(page.root).toEqualHtml(`
      <comment-inator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </comment-inator>
    `);
  });
});
