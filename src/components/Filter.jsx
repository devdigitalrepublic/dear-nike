import React from "react";
import { useState } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import filtersData from "../data/filters.json";
import Collection from "../constants/collections";
import * as searchjs from "searchjs";
import { objectsToArray } from "../helpers";

const Filter = ({ onSelect, feedbacksRef, feedbackTagsRef }) => {
  const [selected, setSelected] = useState({
    [Collection.ACTIONS]: [],
    [Collection.CATEGORIES]: [],
    [Collection.RESOURCES]: [],
    [Collection.COSTS]: []
  });

  const handleFilterSelection = filter => {
    const path = filter.type;
    if (!selected[path]) selected[path] = [];
    if (selected[path].indexOf(filter.id) != -1)
      selected[path].splice(selected[path].indexOf(filter.id), 1);
    else selected[path].push(filter.id);
    setSelected(selected);
    return selected;
  };

  const onSelectFilter = async filter => {
    const filters = handleFilterSelection(filter);
    let filtersIds = [];
    for (const key in filters) {
      const filter = filters[key];
      filtersIds = filtersIds.concat(filter);
    }
    if (filtersIds.length == 0) return onSelect(false);
    const feedbackTags = await feedbackTagsRef.once("value").then(snap => {
      const feedbacks = [];
      snap.forEach(t => {
        const promise = feedbacksRef
          .child(t.key)
          .once("value")
          .then(snapFeedback => ({
            ...snapFeedback.val(),
            key: t.key,
            tags: { ...t.val() }
          }));
        feedbacks.push(promise);
      });
      return feedbacks;
    });
    const feedbacks = await Promise.all(feedbackTags);
    filters._propertySearch = true;
    const filteredFeedbacks = searchjs.matchArray(feedbacks, filters);
    const filteredFeedbacksObj = {};
    filteredFeedbacks.forEach(f => {
      filteredFeedbacksObj[f.key] = f;
    });
    if (typeof onSelect === "function") onSelect(filteredFeedbacksObj, filters);
  };

  const renderDropdownButton = (type, title) => {
    return (
      <DropdownButton as={ButtonGroup} title={title}>
        {objectsToArray(filtersData[type]).map(filter => {
          const f = filter;
          if (typeof t !== "object") return null;
          f.type = type;
          return (
            <Dropdown.Item
              key={f.id}
              onClick={e => onSelectFilter(f)}
              className={
                selected[type].indexOf(f.id) != -1 ? "active" : null
              }
            >
              {f.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  };

  return (
    <div>
      <ButtonGroup className="mb-5">
        {renderDropdownButton(Collection.ACTIONS, "Actions")}
        {renderDropdownButton(Collection.CATEGORIES, "Category")}
        {renderDropdownButton(Collection.RESOURCES, "Resources")}
        {renderDropdownButton(Collection.COSTS, "Cost")}
      </ButtonGroup>
    </div>
  );
};

export default Filter;
