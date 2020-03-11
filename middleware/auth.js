export default function ({ isServer, res, query }) {
  const token = query.token;
  if(token) {
    if(isServer) {
      res.setHeader('Set-Cookie', [`access_token=${token}`]);
    } else {
      console.log(1);
      document.cookie = `access_token${token}`;
    }
  }
}
