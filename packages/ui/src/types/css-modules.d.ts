declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: { readonly [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
