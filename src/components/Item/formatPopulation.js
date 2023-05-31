export function formatpopulation(nombre) {
 let result = nombre
    if (nombre<1000) {
        return result
    }
    if (nombre<1000000){
      result = (nombre/1000).toString()
      return result.slice(0,3).replace(".",",")+" K"
    }
    if (nombre>999999){
        result = (nombre/1000000).toString()
        return result.slice(0,3).replace(".",",")+" M"
      }



}