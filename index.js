const fs = require("fs");

var action = process.argv[2];
var item = process.argv[4];
var item2 = process.argv[6];

const add =()=> {
  fs.readFile("notes.json", function (err, data) {
    var json = JSON.parse(data);
    if (process.argv.length === 7) {
      json.push({ title: item, body: item2 });
      fs.writeFile("notes.json", JSON.stringify(json), function (err) {
        if (err) {
          throw err;
        }
        console.log("Note created \n");
      });
    } else if (process.argv.length === 6) {
      console.log("Missing Required argument BODY");
    } else if (process.argv.length === 4) {
      console.log("Missing Required TITLE");
    } else {
      console.log("Option : ....");
    }
  });
}

const deleteItem =() => {
  if (process.argv.length === 5) {
    fs.readFile("notes.json", function (err, data) {
      var json = JSON.parse(data);
      const index = json.findIndex((x) => x.title === item);
      if (index !== undefined) {
        json.splice(index, 1);
      }
      fs.writeFile("notes.json", JSON.stringify(json), function (err) {
        if (err) {
          throw err;
        }
        console.log("Note was removed");
      });
    });
  } else {
    console.log("HELP");
  }
}

function list() {
  fs.readFile("notes.json", function (err, data) {
    var json = JSON.parse(data);

    for (let i = 0; i < json.length; i++) {
      console.log("title: " + json[i].title, "body: " + json[i].body + "\n");
    }
  });
}

function read() {
  fs.readFile("notes.json", function (err, data) {
    var json = JSON.parse(data);
    const index = json.findIndex((x) => x.title === item);
    console.log(json.splice(index, 1));
  });
}

switch (action) {
  case "add":
    add();
    break;
  case "remove":
    deleteItem();
    break;
  case "list":
    list();
  case "read":
    read();
    default : return "ERROOOR"; break;

}
