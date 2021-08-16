import React, { Component } from "react";
import { render } from "react-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ value, deleteItems }) => (
  <li tabIndex={0} style={{ border: "10px solid #000" }}>
    {value}
    <button onClick={() => deleteItems(value)}>x</button>
  </li>
));

const SortableList = SortableContainer(({ items, deleteItems }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${value}`}
          deleteItems={deleteItems}
          index={index}
          value={value}
        />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7"
    ]
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };
  deleteItems = (itemDelete) => {
    this.setState({
      items: this.state.items.filter((item) => item !== itemDelete)
    });
  };
  addItem = () => {
    this.setState({
      items: [...this.state.items, `Item ${Math.ceil(Math.random() * 100)}`]
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.addItem}>add</button>
        <SortableList
          items={this.state.items}
          deleteItems={this.deleteItems}
          onSortEnd={this.onSortEnd}
        />
      </div>
    );
  }
}

render(<SortableComponent />, document.getElementById("root"));
