async function getUserId(req, connection, auth) {
    let token;
  
    if (connection) {
      token = connection.context.authToken;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.replace('Bearer ', '');
    } else if (req.cookies) {
      token = req.cookies.__session; // eslint-disable-line
    }
  
    if (token) {
      const { uid: userId } = await auth().verifyIdToken(token);
      return userId;
    }
  
    return undefined;
  }

  module.exports = {
      getUserId
  }