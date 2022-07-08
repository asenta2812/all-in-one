const getFullImageUrl = (folder: string, url: string): string => {
  if(folder && url){
    return `${process.env.REACT_APP_URL_IMAGE}/${folder}/${url}`
  }
  return ''
}




export {
  getFullImageUrl
}