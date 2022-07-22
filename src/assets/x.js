 async function follower () {
  var totalUser = 0;
  var maxSegmentUser = 12;
  var element = document.getElementsByClassName('g47SY');

  if (!element) {
    throw  Expectation('an error occurred');
  }

  if (element[1]) {
    totalUser = element[1].getAttribute('title');
    totalUser = totalUser.replaceAll(',', '');
  }

  if (element[2]) {
    element[2].click();
  }


  var listUser = document.getElementsByClassName('notranslate');

  function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  async function scrolling() {

    var length = Math.floor(totalUser / maxSegmentUser);

    for (var i = 0; i < length; i++) {
      var arguments = document.getElementsByClassName('isgrP');

      if (arguments[0].scrollHeight) {
        arguments[0].scrollTop = arguments[0].scrollHeight;
      }
      await delay(2000);
      var progress = ((i / length) * 100);
      console.log('%' + progress);

    }

  }

  scrolling();

  // arguments[0].addEventListener('scroll', func);
  //function func(e) {
  // v=  document.getElementsByClassName('notranslate');
  //
  // if(){
  //   breakLoop= true;
  // }
  // }


  var body = document.querySelector("body");
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  var thCounter = document.createElement('th');
  var thUserName = document.createElement('th');
  var thPid = document.createElement('th');
  var trHead = document.createElement('tr');


//  var style = table.classList;
  //table.style.border = ' 1px solid #000';
  // table.style.borderCollapse='collapse';
  // table.style.width='width: 100%';
//  style.add('table table-dark');
  thCounter.innerHTML = '#';
  thUserName.innerHTML = 'username';
  thPid.innerHTML = 'pid';

  trHead.appendChild(thCounter);
  trHead.appendChild(thUserName);
  trHead.appendChild(thPid);
  thead.appendChild(trHead);
  table.appendChild(thead);

  async function getUserJson(x) {
    var response = await fetch(x);
    return await (response).json();
  }

  for (var i = 0; i < listUser.length; i++) {
    var tdDataUsername = document.createElement('td');
    var tdDataPid = document.createElement('td');
    var tdDataCounter = document.createElement('td');
    var trData = document.createElement('tr');
    tdDataCounter.innerHTML = i + 1;
    tdDataUsername.innerHTML = listUser[i].href;
    try {
   //   let info = await getUserJson(listUser[i].href + '?__a=1');
     // tdDataPid.innerHTML = info.graphql.user.id;
      tdDataPid.innerHTML = 'n/a';
    } catch (e) {
      tdDataPid.innerHTML = 'n/a';
    }

    trData.appendChild(tdDataCounter);
    trData.appendChild(tdDataUsername);
    trData.appendChild(tdDataPid);
    tbody.appendChild(trData);
    table.appendChild(tbody);

  }


  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css';


//  body.innerHTML = '';
  body.appendChild(table);

  // document.getElementsByName( 'header').;
// document.head.appendChild(css);
};

await  follower();

 class="_7UhW9    vy6Bb     MMzan   KV-D4           uL8Hv        T0kll "



