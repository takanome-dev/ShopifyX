import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  //  TODO: remove this file if there is no meta tags added
  render() {
    return (
      <Html className="scroll-smooth">
        <Head />
        <body className="font-sans antialiased text-slate-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
