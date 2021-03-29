import React from "react";
import "./index.scss"
type ItemProps = {
  title: string|undefined;
  itemData: string|undefined;
};
export default function Item(props: ItemProps) {
  return (
    <>
      <span className="item">
        <span className="title">{props.title}</span>
        <span className="item-data">{props.itemData}</span>
      </span>
    </>
  );
}
