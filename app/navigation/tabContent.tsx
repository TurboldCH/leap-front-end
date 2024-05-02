import React from "react";

interface Tab {
  text: string;
}

interface TabContentProps {
  data: Tab[];
  activeId: number;
}

export const TabContent: React.FC<TabContentProps> = ({ data, activeId }) => {
  const content = data.map((item, index) => (
    <div
      key={index}
      className={"tabs-textItem " + (activeId === index ? "show" : "")}
    >
      <p>{item.text}</p>
    </div>
  ));

  return <div className="tabs-content">{content}</div>;
};
