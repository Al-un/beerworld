declare module '!!css-loader!sass-loader!*.scss' {
  type Content = [string, string, string, string];
  const content: Content;
  export default content;
}

// https://fettblog.eu/typescript-modules-for-webpack/
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export default classNames;
}
