class Sanitize {

  getTokenFromHeader(authorization) {
		return authorization ? authorization.split(/(\s+)/)[2] : '';
  }

  inArrayUrl(list, path){
    return list.includes(path)
  }
}

export default new Sanitize();
