const category=document.querySelector(".category");
const categorySpan=document.querySelectorAll(".category span");
const cards=document.querySelector(".cards");

const baseUrl="https://newsapi.org/v2";
const apiKey="&apiKey=fd2567b815a348abae253c52b1c75007";
const backupImage="https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";



async function dataRequest(url){
    try{
        const response=await fetch(baseUrl + url + apiKey);
        const data=response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.articles.forEach(news => {
            cards.innerHTML+=`<div class="card">
                                <div class="image">
                                    <img src="${news.urlToImage ? news.urlToImage : backupImage}" alt="Default News Image">
                                </div>
                                <div class="information">
                                    <div>
                                        <p class="title">${news.title}</p>
                                        <p class="description">${news.description}</p>
                                        <p class="time">
                                            <span>${news.publishedAt.replace("Z","").split("T")[1]}</span>
                                            <span>${news.publishedAt.replace("Z","").split("T")[0]}</span>
                                        </p>
                                    </div>
                                    <div class="other">
                                        <span class="source">${news.source.name}</span>
                                        <a class="url" href="${news.url}">Read Article <i class="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>`;
        });
    });
}
category.addEventListener("click",event => {
   if(event.target.tagName==="SPAN"){
        cards.innerHTML="";
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");
   } 
});

urlRequest("/top-headlines?country=in&language=en");
