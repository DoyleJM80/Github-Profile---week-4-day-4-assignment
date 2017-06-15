(function () {
  'use strict';

  // used github api token for development purposes, will not be present in production
  var myHeaders = {};
  var userUrl = 'https://api.github.com/users/TheDoyles922';
  var reposUrl = 'https://api.github.com/users/TheDoyles922/repos?sort=updated';
  var profileNode = document.getElementById('profile');
  var repoNode = document.getElementById('repos');
  if (TOKEN) {
      // set the AJAX header to send the token
      myHeaders.Authorization = 'token ' + TOKEN;
  }

  fetch(userUrl, {headers: myHeaders}).then(function(res){
    res.json().then(function (data) {
      console.log(data);
      var avatar = document.createElement('div');
      var location = document.createElement('h5');
      var login = document.createElement('h5');
      var email = document.createElement('a');
      var name = document.createElement('h2');
      var bio = document.createElement('p');
      avatar.innerHTML = '<img src="' + data.avatar_url + '">';
      location.textContent = data.location;
      login.textContent = data.login;
      email.textContent = data.email;
      email.href = data.email;
      name.textContent = data.name;
      bio.textContent = data.bio;
      profileNode.appendChild(avatar);
      profileNode.appendChild(name);
      profileNode.appendChild(login);
      profileNode.appendChild(bio);
      profileNode.appendChild(location);
      profileNode.appendChild(email);
    });
  });

  fetch(reposUrl, {headers: myHeaders}).then(function(response){
    response.json().then(function (data2) {
      console.log(data2);
      for (var i = 0; i < data2.length; i++) {
        var newData = data2[i];
        displayRepo(newData);
      }
    });
  });
  function displayRepo(repo) {
    var repoDiv = document.createElement('div');
    var repoName = document.createElement('div');
    var language = document.createElement('span');
    var updated = document.createElement('span');
    repoDiv.classList.add('repo-div');
    updated.textContent = moment(repo.updated_at).fromNow();
    repoName.textContent = repo.name;
    language.textContent = repo.language;
    repoNode.appendChild(repoDiv);
    repoDiv.appendChild(repoName);
    repoDiv.appendChild(language);
    repoDiv.appendChild(updated);
  }
}());
