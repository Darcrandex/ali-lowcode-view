/**
 * @name LocalRender
 * @description
 * @author darcrand
 */

import React from "react";
import ReactRenderer from "@alilc/lowcode-react-renderer";

// 自定义的组件
const Button = ({ children, style }) => (
  <button style={style}>{children}</button>
);

const Title = ({ children, textAlign, color }) => {
  return <h1 style={{ color, textAlign }}>{children}</h1>;
};

const schema = {
  componentName: "Page",
  props: {},
  children: [
    {
      componentName: "Button",
      props: {
        key: "001", // 需要添加 key，否则报错
        type: "primary",
        style: {
          color: "#2077ff",
        },
      },
      children: "确定",
    },
    {
      componentName: "Title",
      props: { key: "002", color: "blue", textAlign: "center" },
      children: "this is a title",
    },
  ],
};

// 组件 map
// 组件文件已经包含在项目中
const components = {
  Button,
  Title,
};

const LocalRender = () => {
  return (
    <>
      <h1>LocalRender</h1>

      <ReactRenderer schema={schema} components={components} />
    </>
  );
};

export default LocalRender;
