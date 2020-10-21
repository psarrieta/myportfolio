"use strict";

document.addEventListener("DOMContentLoaded", buildPage);

//use local maintained json to call api; make array of movie objects to build page
function buildPage () {
  const api_key = "3f6619a9ceef62224b97a825bd53616e";
  const include_adult = "false";
  var ar_actors = [];
  var language = "en-US";
  var page = "1";
  var sort = "popularity.desc";
  var include_video = "false";
  var pageNumber = "1";
  var i = 0;
  fetch('assets/json/arkansas.json')
    .then(r => {
      return r.json();
    })
    .then(data => {
      for (i in data.actors) {
        fetch(`https://api.themoviedb.org/3/person/${data.actors[i].id}?api_key=${api_key}&language=${language}`)
          .then(r => {
            return r.json();
          })
          .then(data => {
              ar_actors.push(data);
              if (data.profile_path != null && data.profile_path != "") {
                  document.getElementById("results").innerHTML +=
                  `<div class="resultBanner">${data.name}<a href=
                  "actorDetails.html?actorId=${data.id}" alt=
                  "${data.name}"><img src=
                  "https://image.tmdb.org/t/p/w500${data.profile_path}"></a></div>`;
              } else {
                document.getElementById("results").innerHTML +=
                 `<div class="resultNoImage"><a href=
                 "actorDetails.html?actorId=${data.id}">${data.name}</a></div>`;
              }
          })
      }
    })
}