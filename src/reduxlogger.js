const logger = store => next => action => {
  console.log(
    `%c DISPATCHING ACTION ==> `,
    'color: #B0E0E6; font-weight: bold; font-size: 12px',
    action
  );
  let result = next(action);
  console.log(
    `%c REDUX NEXT STATE =>   `,
    'color: #00FF7F; font-weight: bold; font-size: 10px;',
    store.getState()
  );
  return result;
};

export default logger;