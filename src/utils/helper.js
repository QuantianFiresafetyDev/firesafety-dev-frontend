export const isAuthenticated = () => {
  const persistRoot = localStorage.getItem('persist:root');
  const { user } = JSON.parse(persistRoot);
  const { token } = JSON.parse(user);
  console.log("DEBUG",user,token)
  if(token!==''){
    return true;
  } 

  return false;
}