const app = document.getElementById("root");
const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(container);

urlString = "https://us-west-2.cloudconformity.com/v1/services"

const request = new XMLHttpRequest();
request.open("GET", urlString, true);
request.onload = function () {

  // Begin accessing JSON data here
  const data = JSON.parse(this.response);
  const articleIncluded = data.included;
  const articleData = data.data;
  const compiledData = [];
  
  articleData.forEach(x =>{
    const record = ({"GroupId": x.id});
    x.relationships.rules.data.forEach(y => {
      articleIncluded.forEach(m =>{
        m.attributes.forEach(n => {
          if(y.id == m.id){
            record.ArticleDetails= ({"ArticleId": y.id, "Title": n.title, "Description": n.description});   
          }
        });
      });
    });
    compiledData.push(record);
 });
  

  if (request.status >= 200 && request.status < 400) {
    compiledData.forEach(header => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = compiledData.GroupId;

      //const p = document.createElement("p");
      //article["included"]["attributes"]["description"] = article["included"]["attributes"]["description"].substring(0, 300);
      //p.textContent = `${article["included"]["attributes"]["description"]}...`;

      container.appendChild(card);
      card.appendChild(h1);
      //card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = "Error: ";
    app.appendChild(errorMessage);
  }
}

request.send();