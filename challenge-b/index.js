const app = document.getElementById("root");
const container = document.createElement("div");
container.setAttribute("class", "col-sm-12");
const rowUpper = document.createElement("row");
rowUpper.setAttribute("class", "row");
const rowLower = document.createElement("row");
rowLower.setAttribute("class", "row");
const splitLower = document.createElement("div");
splitLower.setAttribute("class", "col-sm-6");
const splitRowLeft = document.createElement("div");
splitRowLeft.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6");
const splitRowRight = document.createElement("div");
splitRowRight.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6");


app.appendChild(container);
container.appendChild(rowUpper);
container.appendChild(rowLower);

rowLower.appendChild(splitLower);
rowUpper.appendChild(splitRowLeft);
rowUpper.appendChild(splitRowRight);

urlString = "https://us-west-2.cloudconformity.com/v1/services"


function  makeList(listData, keyTitle, keyCategory) {
  const  listElement  =  document.createElement("ul");
  const  numberOfListItems  =  listData.length;
  for (let  i  =  0; i < numberOfListItems;  ++i) {
    const  listItem  =  document.createElement("li");
    const a = document.createElement("a");
    const urlTitle = listData[i][keyTitle];
    a.href = "www.dud-website-url.com";
    a.textContent = urlTitle;
    a.title = "Related to " + listData[i][keyCategory];
    listItem.appendChild(a);
    listElement.appendChild(listItem);
  }
  return listElement;
}

const request = new XMLHttpRequest();
request.open("GET", urlString, true);
request.onload = function() {
  // Begin accessing JSON data here
  const data = JSON.parse(this.response);
  const articleIncluded = data.included;
  const articleData = data.data;
  let articleCount = 0;
  let compiledData = [];

  articleData.forEach(x => {
    const record = ({
      "GroupId": x.id,
      "ArticleList": []
    });
    x.relationships.rules.data.forEach(y => {
      articleIncluded.forEach(m => {
        if (y.id == m.id) {
          record.ArticleList.push({
            "Title": m.attributes.title,
            "Categories": m.attributes.categories.join(', ')
          });
        }
      });
    });
    compiledData.push(record);
  });

  compiledData = compiledData.sort(function(a, b) {
    return a.GroupId.localeCompare(b.GroupId);
  });

  if (request.status >= 200 && request.status < 400) {


    compiledData.sort().forEach(article => {
      articleCount++;
      const card = document.createElement("div");
      card.setAttribute("class", "card border-0");

      const h2 = document.createElement("h2");

      const linkedTitle = document.createElement("a");

      linkedTitle.href = "www.dud-website-url.com";
      linkedTitle.style = "color: #3E2559"
      linkedTitle.textContent = article.GroupId;
      linkedTitle.title = "Conformity Rules for " + article.GroupId + " service";
      h2.appendChild(linkedTitle);

      const ol = document.createElement("ol");
      ol.appendChild(makeList(article.ArticleList, "Title", "Categories"));


      if (article.GroupId == "Real-Time Threat Monitoring" || article.GroupId == "Budgets") {
        splitLower.appendChild(card);
      } else if (articleCount < Math.floor((compiledData.length) / 2)) {
        splitRowLeft.appendChild(card);
      } else {
        splitRowRight.appendChild(card);
      }
      card.appendChild(h2);
      card.appendChild(ol);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = "Error: ";
    app.appendChild(errorMessage);
  }
}

request.send();
