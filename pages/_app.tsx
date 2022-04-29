import { RecoilRoot } from 'recoil';
import ApolloSetting from '../src/commons/apollo/index';
import Layout from '../src/commons/layout';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
    <RecoilRoot>
        <ApolloSetting>
            <Layout>
              <Component {...pageProps} />
            </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}

export default MyApp
