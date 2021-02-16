export default function (state = [], action) {
  switch (action.type) {
    case 'ADD/PRODUCT':
      return state.concat([action.payload]);
    case 'SET/PRODUCT':
      return action.payload;
  }
  return state;
}
