import Collection from "../constants/collections";

export const mutateFeedbackTags = (feedbackTags, filters) => {
  const tagsList = [];
  for (const tagType in feedbackTags) {
    let tags = feedbackTags[tagType];
    if (!Array.isArray(tags)) tags = keysToArray(tags);
    tags.map(t => {
      const filter = filters[tagType][t];
      tagsList.push({ type: tagType, id: t, name: filter.name });
    });
  }
  return tagsList;
};

export const transformFeedbackRef = (key, messageVal) => {
  return {
    tags: {
      [Collection.ACTIONS]: [],
      [Collection.RESOURCES]: [],
      [Collection.COSTS]: [],
      [Collection.CATEGORIES]: []
    },
    ...messageVal,
    key,
    displayedType: Collection.ACTIONS
  };
};

export const keysToArray = object => Object.keys(object);
export const objectsToArray = object => Object.values(object);

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
