// TypeScript declaration for importing CSS files
// This prevents type errors when importing .css files in TypeScript/TSX files.
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
