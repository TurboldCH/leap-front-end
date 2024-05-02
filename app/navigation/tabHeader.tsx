import React from "react";

interface TabHeaderProps {
  data: string[];
  click: (index: number) => void;
  activeId: number;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  data,
  click,
  activeId,
}) => {
  const doClick = (index: number) => {
    click(index);
  };

  const tabs = data.map((item, index) => (
    <li key={index} className={activeId === index ? "active" : ""}>
      <a onClick={() => doClick(index)}>
        <span>{item}</span>
      </a>
    </li>
  ));

  return <ul className="tabs-header">{tabs}</ul>;
};
