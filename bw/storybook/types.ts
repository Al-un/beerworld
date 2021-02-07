export interface StoryWithContent {
  content: string;
}

export interface StoryWithActionClick {
  onClick: (this: HTMLElement, event: MouseEvent) => any;
}

export interface StoryWithActionInput {
  onInput: (this: HTMLElement, event: Event) => any;
}
