(function () {
  'use strict';

  // used github api token for development purposes, will not be present in production
  var myHeaders = {};
  var userUrl = 'https://api.github.com/users/TheDoyles922';
  var reposUrl = 'https://api.github.com/users/TheDoyles922/repos?sort=updated';
  var orgUrl = 'https://api.github.com/user/orgs';
  var profileNode = document.getElementById('profile');
  var repoNode = document.getElementById('repos');
  var repoTotal = document.getElementById('repo-total');
  var orgSection = document.getElementById('orgs');

  try {
    myHeaders['Authorization'] = 'token ' + TOKEN;
  } catch (e) {
    //ignore error
  }

  // if (TOKEN) {
  //     // set the AJAX header to send the token
  //     myHeaders.Authorization = 'token ' + TOKEN;
  // }

  fetch(userUrl, {headers: myHeaders}).then(function(res){
    res.json().then(function (data) {
      console.log(data);
      var iconSpan = document.createElement('span');
      var avatar = document.createElement('div');
      var emailDiv = document.createElement('div');
      var location = document.createElement('h5');
      var login = document.createElement('h3');
      var email = document.createElement('a');
      var name = document.createElement('h2');
      var bio = document.createElement('p');
      var locationIconContainer = document.createElement('div');
      var locationImage = document.createElement('img');
      locationImage.src = 'images/location-image.png';
      locationImage.classList.add('location-image');
      avatar.innerHTML = '<img src="' + data.avatar_url + '">';
      avatar.classList.add('image');
      iconSpan.setAttribute('class', 'fa fa-envelope-o');
      location.textContent = ' ' + data.location;
      locationIconContainer.classList.add('location-container');
      login.textContent = data.login;
      email.textContent = data.email;
      email.href = data.email;
      name.textContent = data.name;
      bio.textContent = data.bio;
      profileNode.appendChild(avatar);
      profileNode.appendChild(name);
      profileNode.appendChild(login);
      profileNode.appendChild(bio);
      profileNode.appendChild(locationIconContainer);
      locationIconContainer.appendChild(locationImage);
      locationIconContainer.appendChild(location);
      profileNode.appendChild(emailDiv);
      emailDiv.appendChild(iconSpan);
      emailDiv.appendChild(email);
    });
  });

  fetch(reposUrl, {headers: myHeaders}).then(function(response){
    response.json().then(function (data2) {
      console.log(data2);
      repoTotal.innerHTML = data2.length;
      for (var i = 0; i < data2.length; i++) {
        var newData = data2[i];
        displayRepo(newData);
      }
    });
  });

  fetch(orgUrl, {headers: myHeaders}).then(function(resp){
    resp.json().then(function (data3) {
      // if no orgazizations, do not show org section
      if (data3.length === 0 ) {
        return;
      }
      // create org title
      var orgTitle = document.createElement('h4');
      orgTitle.textContent = 'Organizations';
      orgSection.appendChild(orgTitle);
      data3.forEach(function(){
        var orgImgNode = document.createElement('span');
        orgImgNode.setAttribute('class', 'org-image');
        var orgImg = 'img src="' + data3[0].avatar_url + '">';
        orgImgNode.innerHTML = orgImg;
        console.log(orgImg);
        orgSection.appendChild(orgImgNode);

      });
    });
  });

  function displayRepo(repo) {
    var repoDiv = document.createElement('div');
    var repoCont = document.createElement('div');
    var circle = document.createElement('div');
    var repoName = document.createElement('a');
    var language = document.createElement('span');
    var updated = document.createElement('span');
    circle.classList.add('circle');
    repoDiv.classList.add('repo-div');
    language.classList.add('repo-span');
    updated.classList.add('repo-span');
    repoCont.classList.add('repo-cont');
    updated.textContent = 'Updated ' + moment(repo.updated_at).fromNow();
    repoName.textContent = repo.name;
    repoName.href = repo.html_url;
    repoName.classList.add('repo-title');
    language.textContent = repo.language;
    repoNode.appendChild(repoDiv);
    repoDiv.appendChild(repoCont);
    repoCont.appendChild(repoName);
    repoDiv.appendChild(circle);
    repoDiv.appendChild(language);
    repoDiv.appendChild(updated);
    if (repo.language === 'JavaScript') {
      circle.style.backgroundColor = '#f1e05a';
    } else if (repo.language === 'CSS') {
      circle.style.backgroundColor = '#563d7c';
    }
  }
}());
