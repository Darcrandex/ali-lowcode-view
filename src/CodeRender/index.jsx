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
  const [data, setData] = useState({ schema: {}, components: {} });

  useEffect(() => {
    const init = async () => {
      const packages = packageJson;
      const { componentsMap: componentsMapArray, componentsTree } = schemeJson;
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

      const assetLoader = new AssetLoader();
      await assetLoader.load(libraryAsset);

      // const components = await injectComponents(buildComponents(libraryMap, componentsMap));

      // components 为空对象
      const components = buildComponents(libraryMap, componentsMap);

      setData({ schema, components });
    };

    init();
  }, []);

  return (
    <>
      <h1>CodeRender</h1>
      <ReactRenderer schema={data.schema} components={data.components} />
    </>
  );
};

export default CodeRender;
