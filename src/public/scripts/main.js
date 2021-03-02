/**
 * funcion para buscar cookies
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * funcion para seleccionar icono por extension
 */
function getIcon(filename){
  let extension=filename.split('.').pop();
  const picture = ['png', 'jpg', 'jpeg','bmp', 'gif', 'tif', 'JPG']
  const video = ['avi', 'mov', 'mp4', 'm4v', 'wmv', 'mpg', 'mpeg']
  const compressed = ['rar', 'zip']

  if(picture.includes(extension)) { return "icons/png/022-picture-3.png"}
  if(extension == 'pdf') { return "icons/png/051-pdf.png" }
  if(extension == 'psd') { return "icons/png/070-psd.png" }
  if(video.includes(extension)) { return "icons/png/003-video-file-2.png"}
  if(extension == undefined) { return "icons/png/119-folder-22.png" }
  if(compressed.includes(extension)) { return "icons/png/217-archive.png" }
  if(extension == 'iso') { return "icons/png/121-iso.png" }
  if(extension == 'docx' || extension == 'doc') { return "icons/png/052-doc-3.png" }
  if(extension == 'xls' || extension == 'xlsx') { return "icons/png/077-xls.png"}
  if(extension == 'mp3') { return "icons/png/199-video-file.png"}
  return "icons/png/208-file-3.png"
}


/**
 * componer la ruta en la que nos encontramos
 */
let route = getCookie('route')
let route_html = ''
let last_c = 0;
for (let c = 0; c < route.length; c++) {
  if(route.charAt(c) === '/'){
    route_html += '<li><a href="#">' + route.substr(last_c, c - last_c) + '</a></li>'
    last_c = c
  }
}
route_html += '<li><a href="#">' + route.substr(last_c) + '</a></li>'
document.getElementById('route').innerHTML = route_html

/**
 *  descargar y mostrar la lista de items dentro de una carpeta
 */
fetch('/list')
  .then(response => response.json())
  .then(data => {
    let html = ''
    const div = document.querySelector('folders');
    data.forEach(item => {
      html += '<div><a href="/download/' + item +'"><img src=' + getIcon(item) + '><p>' + item + '</p></a></div>' 
    });
    document.getElementById("folders").innerHTML = html
  });