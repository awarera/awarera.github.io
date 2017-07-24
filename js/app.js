window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').left.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};


ons.ready(function () {
  const sidemenu = document.getElementById('appSplitter');
  ons.platform.isAndroid() ? sidemenu.left.setAttribute('animation', 'overlay') : sidemenu.left.setAttribute('animation', 'reveal');

  document.querySelector('#tabbar-page').addEventListener('postchange', function(event) {
    if (event.target.matches('#appTabbar')) {
      event.currentTarget.querySelector('ons-toolbar .center').innerHTML = event.tabItem.getAttribute('label');
    }
  });
});




document.addEventListener('init', function (event) {
  if (event.target.id === 'pageNav1') {
    var title = event.target.data && event.target.data.title ? event.target.data.title : 'Create Booking';
    event.target.querySelector('ons-toolbar div.center').textContent = title;
  }

});

function editSelects(event) {
  document.getElementById('choose-sel').removeAttribute('modifier');
  if (event.target.value == 'material' || event.target.value == 'underbar') {
    document.getElementById('choose-sel').setAttribute('modifier', event.target.value);
  }
}

var showPopover = function(target) {
  document
    .getElementById('popover')
    .show(target);
};

var hidePopover = function() {
  document
    .getElementById('popover')
    .hide();
};


var showPopover2 = function(target) {
  document
    .getElementById('popover2')
    .show(target);
};

var hidePopover2 = function() {
  document
    .getElementById('popover2')
    .hide();
};


document.addEventListener('init', function(event) {
  if(event.target.id == "home") {
    openDb();
    getItems();
  }
});


var db = null;

function onError(tx, e){
  alert("Something went wrong:" + emessage);
}

function onSuccess(tx, r) {
  getItems();
}

function openDb() {
  db = openDatabase("Meetings", "1", "meetings", 1024*1024);

  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS items (ID INTEGER PRIMARY KEY ASC, item TEXT)", []);
  });
}

function getItems() {
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM items", [], renderItems, onError);
  });
}

function renderItems(tx, rs) {
  var output = "";
  var list = document.getElementById('meetings');

  for (i = 0; i < rs.rows.length; i++)
  {
    var row = rs.rows.item(i);
    output += "<ons-list-item style=\"padding:0px 0px 0px 40px;\">" + row.item +
    "<div class=\"right\"> <ons-button onclick='deleteItem(" + row.ID + ");')><ons-icon icon=\"trash\"></ons-icon></ons-button></div>" +
    "</ons-list-item>";
  }

  list.innerHTML = output;
}

function addItem()
{
  var ox = document.getElementById('item').value;
  var ox1 = document.getElementById('item1').value;
  var ox2 = document.getElementById('item2').value;
  var ox3 = document.getElementById('item3').value;
  if (ox == "" || ox1 == "" || ox2 == "" || ox3 == "") {
      alert("Please fill out all the fields");
      return false;
  } else {
    var textbox =  document.getElementById('item');
    var value = textbox.value;

    db.transaction(function(tx) {
      tx.executeSql("INSERT INTO items (item) VALUES (?)", [value], onSuccess, onError);
    });

    textbox.value = "";
    myNavigator.popPage()
  }

}

function deleteItem(id)
{
  db.transaction(function(tx) {
    tx.executeSql("DELETE FROM items WHERE ID=?", [id], onSuccess, onError);
  });

}
