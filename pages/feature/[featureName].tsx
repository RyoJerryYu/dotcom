import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import FeatureMatrix, { FEATURE_LIST } from "../../components/FeatureMatrix";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LatestVersion from "../../components/LatestVersion";

interface Props {
  featureName: string;
}

const Feature = (props: Props) => {
  const { featureName } = props;
  const feature = FEATURE_LIST.find((feature) => feature.slug === featureName);

  return (
    <div className="h-full flex flex-col justify-start items-start px-4 sm:px-0">
      <Head>
        <title>
          memos - {feature?.title} - {feature?.description}
        </title>
        <link rel="icon" href="/logo.webp" />
        <meta name="description" content="A lightweight, self-hosted memo hub. Open Source and Free forever" />
        <meta name="og:title" property="og:title" content="memos" />
        <meta name="og:description" content="A lightweight, self-hosted memo hub. Open Source and Free forever" />
        <meta name="og:type" property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="og:url" property="og:url" content="https://usememos.com" />
      </Head>

      <Header />

      <main className="w-full max-w-4xl h-auto mx-auto flex flex-col justify-start items-start pt-4 pb-16">
        <div className="w-full flex flex-col justify-start items-center">
          <LatestVersion />
          <img className="h-24 sm:h-32 w-auto rounded-lg" src="/logo.webp" alt="logo" />
        </div>
        <div className="w-full flex flex-col justify-center items-center sm:px-16">
          <h2 className="w-full text-center text-4xl sm:text-6xl font-bold mt-4 mb-4">{feature?.title}</h2>
          <h3 className="w-full text-base sm:text-lg text-gray-500 text-center mb-2">{feature?.description}</h3>
        </div>
        <div className="w-full flex flex-row justify-center items-center space-x-2 py-4">
          <a target="_blank" href="https://github.com/usememos/memos">
            <img alt="GitHub stars" src="https://img.shields.io/github/stars/usememos/memos?logo=github" />
          </a>
          <a target="_blank" href="https://hub.docker.com/r/neosmemo/memos">
            <img alt="Docker" src="https://img.shields.io/docker/pulls/neosmemo/memos.svg?logo=docker" />
          </a>
          <a target="_blank" href="https://discord.gg/tfPJa4UmAv">
            <img alt="Discord" src="https://img.shields.io/badge/discord-chat-5865f2?logo=discord" />
          </a>
        </div>
        <div className="w-full flex flex-row justify-center items-center space-x-2">
          <a href="https://discord.gg/tfPJa4UmAv" target="_blank" className="text-blue-600 leading-6 text-base hover:underline">
            Discuss in Discord 🙋
          </a>
        </div>
        <img className="w-full h-auto mt-2 mb-2" src="/demo.webp" alt="demo-screenshot" />
        <FeatureMatrix />
      </main>

      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: FEATURE_LIST.map((feature) => {
      return { params: { featureName: feature.slug } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const featureName = params!.featureName;
  return {
    props: {
      featureName: featureName,
    },
  };
};

export default Feature;
