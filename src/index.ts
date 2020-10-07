import webpack from 'webpack';
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

export default function loader(
  this: webpack.loader.LoaderContext,
  source: string
): string {
  const loaderContext = this;
  
  return source;
};
