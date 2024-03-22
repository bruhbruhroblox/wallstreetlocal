import axios from "axios";

import { Provider } from "react-redux";
import { wrapper } from "@/redux/store";

import Layout from "components/Layouts/Layout";
import Info from "components/Filer/Info";
import Other from "components/Filer/Other";
import Building from "components/Filer/Building";

// TODO: implement this function
async function getContinuous() {}

// TODO: implement this function
async function getPersist() {}

// TODO: implement this function
async function getTab() {}

// TODO: implement this function
async function getCik() {}

// TODO: implement this function
async function getQuery() {}

const Filer = (props) => {
  const query = props.query;
  const cik = props.cik;

  const continuous = props.continuous;
  const persist = props.persist;
  const tab = props.tab;

  if (query.ok || continuous) {
    return <Info cik={cik} tab={tab} />;
  }

  if (query.building || persist) {
    return <Building cik={cik} persist={persist} />;
  }

  if (query.error) {
    return <Other />;
  }
};

const server = process.env.NEXT_PUBLIC_SERVER;
export async function getServerSideProps(context) {
  const cik = context.query.cik || null;
  const persist = context.query.persist;
  const tab = context.query.tab;
  const continuous = context.query.continuous;

  const query = {
    ok: false,
    building: false,
    error: false,
  };

  await axios
    .get(server + "/filers/query", {
      params: { cik },
      validateStatus: (status) => status < 500,
    })
    .then((r) => {
      switch (r?.status) {
        case 201:
        case 409:
          query.building = true;
          break;
        case 200:
          query.ok = true;
          break;
        default:
          query.error = true;
          break;
      }
    })
    .catch((e) => {
      console.error(e);
      query.error = true;
    });

  return {
    props: {
      query,
      cik,
      tab: tab || "stocks",
      persist: persist || null,
      continuous: continuous || null,
    },
  };
}

Filer.getLayout = function getLayout({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { cik } = props.pageProps;
  const reduxStore = { ...store, filer: { ...store.filer, cik: cik } };

  return (
    <Layout>
      <Provider store={reduxStore}>
        <Component {...props.pageProps} />
      </Provider>
    </Layout>
  );
};

export default Filer;
