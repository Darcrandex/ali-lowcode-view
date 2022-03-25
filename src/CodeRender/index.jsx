/**
 * @name CodeRender
 * @description
 * @author darcrand
 */

import React, { useState } from "react";
import { buildComponents, AssetLoader } from "@alilc/lowcode-utils";
import ReactRenderer from "@alilc/lowcode-react-renderer";

// 这两个数据就是 demo 中点击保存后，缓存在 localStorage 中的数据
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

    // const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();

    // 先动态加载依赖包
    // 会在 head 标签中动态添加 script 和 link 标签
    await assetLoader.load(libraryAsset);

    // const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    // 这个步骤是把页面中依赖的组件定义成一个 Map
    // 里面的组件会关联上述动态加载的依赖包中指定的组件
    // 类似这样：
    // { Button : window.UILibray.Button }
    const components = buildComponents(libraryMap, componentsMap);

    const schema = componentsTree[0];

    // 最终的结构参考 LocalRender
    setData({ schema, components });

    console.log("schema", schema);
    console.log("components", components);
  }

  if (!data.schema || !data.components) {
    init();
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>CodeRender</h1>
      <ReactRenderer schema={data.schema} components={data.components} />
    </>
  );
};

export default CodeRender;
