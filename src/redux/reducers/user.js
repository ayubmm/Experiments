export default function (
  state = [{name: 'Ayub', email: 'ayubmmaruf@gmail.com'}],
  action,
) {
  switch (action.type) {
    case 'ADD/USER':
      return state.concat([action.payload]);
    case 'SET/USER':
      return action.payload;
  }
  return state;
}
