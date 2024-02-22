var btnActivate = false;

function loadPage(){
    if(btnActivate){

        const structurePlace = document.getElementById("addBook");

        const textBookName = document.createTextNode("Titre du livre");
        structurePlace.appendChild(textBookName);

        const enterBookName = document.createElement("input");
        enterBookName.id = "bookName";
        structurePlace.appendChild(enterBookName);

        const textAuthorName = document.createTextNode("Auteur");
        structurePlace.appendChild(textAuthorName);

        const enterAuthorName = document.createElement("input");
        enterAuthorName.id = "authorName";
        structurePlace.appendChild(enterAuthorName);

        const researchButton = document.createElement("button");
        const textResearchButton = document.createTextNode("Rechercher");
        researchButton.appendChild(textResearchButton);
        researchButton.classList.add("btn");
        researchButton.addEventListener("click",async function(){
            PlaceReasearchResult.innerHTML="";
            const bookName = enterBookName.value;
            const authorName = enterAuthorName.value;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q="+bookName+"+intitle&"+authorName+"+inauthor");
            xhr.send();
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = xhr.response;
                    console.log(data);
                    const ligne = document.createElement("hr");
                    PlaceReasearchResult.appendChild(ligne);
                    const PlaceTextReasearchResult = document.createElement("h2");
                    const TextReasearchResult = document.createTextNode("Résultat de recherche");
                    PlaceTextReasearchResult.appendChild(TextReasearchResult);
                    PlaceReasearchResult.appendChild(PlaceTextReasearchResult);

                    blocPlaceReasearchResult = document.createElement("div")
                    PlaceReasearchResult.appendChild(blocPlaceReasearchResult)
                    blocPlaceReasearchResult.classList.add("research")


                    for(let i=0; i < (data.items.length); i++) {

                        const blocResult = document.createElement("div");
                        blocPlaceReasearchResult.appendChild(blocResult);
                        blocResult.classList.add("infoBook");

                        bookTitle = document.createElement("h4");
                        bookTitle.innerHTML = `titre : ${data.items[i].volumeInfo.title.slice(0,100)}`;
                        blocResult.appendChild(bookTitle);

                        bookId = document.createElement("h5");
                        bookId.innerHTML = `id : ${data.items[i].id}`
                        blocResult.appendChild(bookId);
                        
                        bookAuthor = document.createElement("h6");
                        if(`auteur : ${data.items[i].volumeInfo.authors??"Inconnue"}` != 'auteur : Inconnue'){
                            bookAuthor.innerHTML = `auteur : ${data.items[i].volumeInfo.authors[0]}`;
                        }
                        else{
                            bookAuthor.innerHTML = `auteur : Inconnue`;
                        }
                        blocResult.appendChild(bookAuthor);

                        bookDescription = document.createElement("p");
                        if (`${data.items[i].volumeInfo.description??"Information manquante"}` != 'Information manquante'){
                            description = `${data.items[i].volumeInfo.description}`;
                            bookDescription.innerHTML = description.slice(0,200);
                        }
                        else{
                            bookDescription.innerHTML = `Information manquante`
                        }
                        blocResult.appendChild(bookDescription);


                        bookPicture =document.createElement("img");
                        bookPicture.src = `${data.items[i].volumeInfo.imageLinks.thumbnail}`
                        blocResult.appendChild(bookPicture)
                    }
                };
            }
        })

        structurePlace.appendChild(researchButton);
        const buttonLoad = document.createElement("button");
        const textButtonLoad = document.createTextNode("Annuler");
        buttonLoad.classList.add("btn");
        buttonLoad.addEventListener("click",function(){
            btnActivate = false;
            structurePlace.innerHTML="";
            loadPage();
        })
        buttonLoad.appendChild(textButtonLoad);
        structurePlace.appendChild(buttonLoad);

        const PlaceReasearchResult = document.createElement("div")
            structurePlace.appendChild(PlaceReasearchResult);
    }
    else{
        const buttonLoad = document.createElement("button");
        const textButtonLoad = document.createTextNode("Ajouter un livre");
        const structurePlace = document.getElementById("addBook");
        buttonLoad.classList.add("btn");
        buttonLoad.addEventListener("click",function(){
            btnActivate = true;
            structurePlace.innerHTML="";
            loadPage();
        })
        buttonLoad.appendChild(textButtonLoad);
        structurePlace.appendChild(buttonLoad);
    }
}

loadPage();