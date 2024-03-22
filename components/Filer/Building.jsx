import { Metadata } from "next";
import Head from "next/head";

import Progress from "components/Progress/Progress";
import Recommended from "components/Recommended/Recommended";
export const metadata: Metadata = {
    title: `Building...`,
};

const Building = (props) => {
    const cik = props.cik || null;
    const persist = props.persist;
    return (<>
      
      <Progress cik={cik} persist={persist}/>
      <Recommended />
    </>);
};

export default Building;

