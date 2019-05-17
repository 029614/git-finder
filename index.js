'use strict';

let gitHandle = '';
let repoTitle = '';
let repoUrl = '';

function getUserInformation(gitHandle) {
  console.log('Gitting...');
  fetch('https://api.github.com/users/' + gitHandle + '/repos')
    .then(response => {
      if (!response.ok) {alert("There was a problem!")}
      return response.json()
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong!'));
};

function displayResults(results) {
  console.log('displaying results');
  for (let i = 0; i < results.length; i++){
    repoTitle = results[i].name;
    console.log(repoTitle);
    repoUrl = results[i].html_url;
    console.log(repoUrl);
    $('.resultList').append(
      `<li><a href="` + repoUrl + `">` + repoTitle + `</a></li>`
    );
  }
  $('.results').removeClass('hidden');
  console.log('something happened');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    gitHandle = $("#gitHandle").val();
    console.log('watchForm declares username: ' + gitHandle);
    getUserInformation(gitHandle);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
