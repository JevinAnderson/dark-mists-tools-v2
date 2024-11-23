/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import * as React from "react";
import Layout from "./src/components/layout";

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <title key="site-title">Darkmist Tools</title>,
    <link key="favicon" rel="icon" type="image/x-icon" href="/favicon.ico" />,
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossOrigin="anonymous"
      key="bootstrap-css"
    />,
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />,
  ]);
  setPreBodyComponents([
    <script
      key="firebase-source"
      src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js"
    ></script>,
    <script
      key="firebase-config"
      dangerouslySetInnerHTML={{
        __html: `
          var config = {
            apiKey: 'AIzaSyAv3C21gFPUqwE6hK1flhfK6_t-UM8dUe4',
            authDomain: 'dark-mists-tools.firebaseapp.com',
            databaseURL: 'https://dark-mists-tools.firebaseio.com',
            projectId: 'dark-mists-tools',
            storageBucket: 'dark-mists-tools.appspot.com',
            messagingSenderId: '644570721333'
          };

          firebase.initializeApp(config);
          firebase.database.enableLogging(false, false);`,
      }}
    ></script>,
  ]);
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
