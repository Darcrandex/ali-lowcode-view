/**
 * @name CodeRender
 * @description
 * @author darcrand
 */

import React, { useEffect, useState } from "react";
import {
  buildComponents,
  assetBundle,
  AssetLoader,
  AssetLevel,
} from "@alilc/lowcode-utils";
import ReactRenderer from "@alilc/lowcode-react-renderer";

import schemeJson from "./schema.json";
import packageJson from "./packages.json";

const CodeRender = () => {
  const [data, setData] = useState({
    schema: undefined,
    components: undefined,
  });

  async function init() {
    const packages = packageJson;
    const projectSchema = schemeJson;

    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap = {};
    componentsMapArray.forEach((component) => {
      componentsMap[component.componentName] = component;
    });

    const schema = componentsTree[0];

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    // await assetLoader.load(libraryAsset);

    // const components = await injectComponents(buildComponents(libraryMap, componentsMap));
    const components = buildComponents(libraryMap, componentsMap);
    console.log("components", components); // {}

    setData({
      schema,
      components,
    });
  }

  if (!data.schema || !data.components) {
    init();
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>CodeRender</h1>
      {/* <ReactRenderer schema={data.schema} components={data.components} /> */}
    </>
  );
};

export default CodeRender;
