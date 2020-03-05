import React from "react";
import Collection from "../constants/collections";
import filtersData from "../data/filters.json";
import { objectsToArray } from "../helpers";
import { Badge } from "react-bootstrap";
import { uuidv4 } from "../helpers";

const SideMenu = ({
  isOpen,
  feedback,
  feedbackTagsRef,
  feedbackRef,
  onUpdate,
  onAdd,
  onDelete
}) => {
  const addTag = tagFilter => {
    const tags = feedback.tags[tagFilter.type];
    tags[tagFilter.id] = true;
    feedbackTagsRef
      .child(feedback.key)
      .child(tagFilter.type)
      .set(tags);
    feedbackRef
      .child(feedback.key)
      .child("tagged")
      .set(true);
    if (typeof onUpdate === "function") onUpdate(feedback.tags);
    if (typeof onAdd === "function") onAdd(tagFilter, feedback.tags);
  };

  const deleteTag = tagFilter => {
    const tags = feedback.tags;
    delete tags[tagFilter.type][tagFilter.id];
    for (const type in tags) {
      const tag = tags[type];
      feedbackTagsRef
        .child(feedback.key)
        .child(type)
        .set(tag);
    }
    if (!objectsToArray(tags).length)
      feedbackRef
        .child(feedback.key)
        .child("tagged")
        .set(false);

    if (typeof onUpdate === "function") onUpdate(feedback.tags);
    if (typeof onDelete === "function") onDelete(tagFilter, feedback.tags);
  };

  const renderFilters = type => {
    return objectsToArray(filtersData[type]).map(filter => {
      console.log(feedback.tags);

      const hasTag = feedback.tags[type].indexOf(filter.id) !== -1;
      filter.type = type;
      return (
        <Badge
          pill
          variant={hasTag ? "primary" : "secondary"}
          key={"label-" + uuidv4()}
          style={{ cursor: "pointer", marginRight: 10 }}
          onClick={e => {
            if (hasTag) deleteTag(filter);
            else addTag(filter);
          }}
        >
          {filter.name}
        </Badge>
      );
    });
  };
  if (!feedback) return null;
  return (
    <div className="sidebar" style={{ display: isOpen ? "block" : "none" }}>
      <h4>Sports</h4>
      <div style={{ display: "flex" }}>
        {renderFilters(Collection.CATEGORIES)}
      </div>
      <h4>Resources</h4>
      <div style={{ display: "flex" }}>
        {renderFilters(Collection.RESOURCES)}
      </div>
      <h4>Cost</h4>
      <div style={{ display: "flex" }}>{renderFilters(Collection.COSTS)}</div>
    </div>
  );
};

export default SideMenu;
