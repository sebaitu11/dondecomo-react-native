var api = {
  
  getRestos(page, position){
    if(position){
        url = "https://dondecomo.herokuapp.com/restos/get_restos.json?per_page=10&lat=" + position.lat +
              "&lng=" + position.lng + "&page=" + page
    }else {
        url = "https://dondecomo.herokuapp.com/restos/get_restos.json?per_page=10?" + "&page=" + page
    }

    return fetch(url).then((res) => res.json())
  },

  getResto(resto_id){
    url = "https://dondecomo.herokuapp.com/restos/" +  resto_id +"/data.json"
    return fetch(url).then((response) => response.json())
  }
}


module.exports = api