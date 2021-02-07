import { StoryContext } from '@storybook/html';

/**
 * Copied from @storybook/html/dist/ts3.9/client/preview/types.d.ts
 */
type StoryFnHtmlReturnType = string | Node;

/**
 *
 * @param story
 * @returns
 */
export const sbDecorateCenter: (
  story: () => StoryFnHtmlReturnType,
  context: StoryContext
) => StoryFnHtmlReturnType = (story) => {
  const centerStyle =
    `align-items: center;` +
    `display: flex;` +
    `flex-direction: row;` +
    `height: 100vh;` +
    `justify-content: center;` +
    // to compensate the padding:16px of body.sb-main-padded
    `margin: -16px;`;
  const centerWrapper = document.createElement('div');
  centerWrapper.setAttribute('style', centerStyle);

  const resolvedStory = story();
  if (typeof resolvedStory === 'string') {
    centerWrapper.innerHTML = resolvedStory;
  } else {
    centerWrapper.appendChild(resolvedStory);
  }

  return centerWrapper;
};
