import { Metadata } from "next";
import Head from "next/head";
import Error from "next/error";
export const metadata: Metadata = {
    title: `404 - Filer not found`,
};

const Other = () => {
    return (<>
      
      <Error statusCode={404}/>
    </>);
};

export default Other;

