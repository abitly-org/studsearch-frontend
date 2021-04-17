
// `path` argument in event can be missing in webkit
// so we should recreate path on our own

// used primarily to check, whether there was a click on a button itself, or on a button in a button
// normal people usually use .stopPropagation(), but... sometimes I don't get that event object,
//  sometimes it is against... logic? (why child button should know where is it located)
//  and stopping propagation by default is just evil

// if you are using <Button> component, then you are fine, as this function is used in it by default
export default (element: Element | null, lookup: (element: Element) => boolean) => {
  while (element !== null) {
      console.log('hierarchyContains: ', element, ' => ', lookup(element));
      if (lookup(element))
          return true;
      element = element.parentElement;
  };
  return false;
};