async function follower() {
  var totalUser = 0;
  var maxSegmentUser = 12;
  var element = document.getElementsByClassName('g47SY');
  var follower =document.getElementsByClassName("vy6Bb");

  if (!element|| !follower) {
    throw  Expectation('an error occurred');
  }

  if (element[1]) {
    totalUser = element[1].getAttribute('title');
    totalUser = totalUser.replaceAll(',', '');
  }

  if (follower[1]) {
    follower[1].click();
  }


  function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  async function getUserJson(x) {
    var response = await fetch(x);
    return await (response).json();
  }

  async function scrolling() {
    await delay(2000);

    var length = Math.floor(totalUser / maxSegmentUser);

    for (var i = 0; i < length; i++) {
      var scroller = document.getElementsByClassName('isgrP');

      if (scroller[0].scrollHeight !== "undefined" && scroller[0].scrollHeight > 0) {
        scroller[0].scrollTop = scroller[0].scrollHeight;
      }
      await delay(2000);

      try {
        var lable = document.getElementsByClassName("m82CD");
        lable[0].innerHTML = 'detected user ' + (i * maxSegmentUser) + '(%' + Math.ceil(((i / length) * 100)) + ')';

      } catch (e) {

      }
    }


    var body = document.body;
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var thCounter = document.createElement('th');
    var thUserName = document.createElement('th');
    var thPid = document.createElement('th');
    var threaf = document.createElement('th');
    var trHead = document.createElement('tr');

    var listUser = document.getElementsByClassName('notranslate');


    thCounter.innerHTML = '#';
    thUserName.innerHTML = 'username';
    thPid.innerHTML = 'pid';
    threaf.innerHTML='link';

    trHead.appendChild(thCounter);
    trHead.appendChild(thUserName);
    trHead.appendChild(thPid);
    trHead.appendChild(threaf);
    thead.appendChild(trHead);
    table.appendChild(thead);

    for (var i = 0; i < listUser.length; i++) {
      var tdDataUsername = document.createElement('td');
      var tdDataPid = document.createElement('td');
      var tdDataCounter = document.createElement('td');
      var tdDataRef = document.createElement('td');
      var trData = document.createElement('tr');
      tdDataCounter.innerHTML = i + 1;
      tdDataUsername.innerHTML = listUser[i].innerHTML;
      tdDataRef.innerHTML= listUser[i].href;
      try {
        var lable = document.getElementsByClassName("m82CD");
        lable[0].innerHTML = 'getting user pid ' + i;

      } catch (e) {

      }

      try {


        let info = await getUserJson('https://www.instagram.com/' + listUser[i].title.replaceAll(' ', '').replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') + '/?__a=1');
        tdDataPid.innerHTML = info.graphql.user.id;

      } catch (e) {

        tdDataPid.innerHTML = 'n/a';
      }

      trData.appendChild(tdDataCounter);
      trData.appendChild(tdDataUsername);
      trData.appendChild(tdDataPid);
      trData.appendChild(tdDataRef);
      tbody.appendChild(trData);
      table.appendChild(tbody);

    }
    try {
      var close = document.getElementsByClassName('wpO6b');
      close[2].click();
    } catch (e) {

    }


     body.innerHTML = '';
    body.appendChild(table);

  }

  await scrolling();
};

await follower();
