
var btnActivate = false;
const structurePlace = document.getElementById("addBook");
const bookSave = [];
sessionStorage.clear();
const placeSaveBook = document.getElementById("content");
    const placeAllSaveBook = document.createElement("div");



function firstPage(){
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

function maPochList(){
    var heights = 0;
    placeSaveBook.appendChild(placeAllSaveBook);
    placeAllSaveBook.innerHTML="";

    for (i=0;i<bookSave.length;i++){

        const placeBlocSaveBook = document.createElement("div");
        placeAllSaveBook.appendChild(placeBlocSaveBook);
        placeBlocSaveBook.classList.add("infoSaveBook");

        const deleteBook = document.createElement("a");
        deleteBook.classList.add("fa-solid");
        deleteBook.classList.add("fa-trash");
        deleteBook.classList.add("fa-2xl");
        deleteBook.classList.add("iconPosition");
        deleteBook.id = bookSave[i];
        deleteBook.addEventListener("click",function(){
            sessionStorage.removeItem("title"+this.id)
            sessionStorage.removeItem(this.id)
            sessionStorage.removeItem("author"+this.id)
            sessionStorage.removeItem("description"+this.id)
            sessionStorage.removeItem("image"+this.id)
            indexToRemove =bookSave.indexOf(this.id)
            bookSave.splice(indexToRemove,1)
            placeAllSaveBook.innerHTML="";
            maPochList()
        })
        placeBlocSaveBook.appendChild(deleteBook)

        bookTitle = document.createElement("h4");
        bookTitle.innerHTML = sessionStorage.getItem("title"+bookSave[i]);
        placeBlocSaveBook.appendChild(bookTitle);

        bookId = document.createElement("h5");
        bookId.innerHTML = sessionStorage.getItem(bookSave[i]);
        placeBlocSaveBook.appendChild(bookId);
                        
        bookAuthor = document.createElement("h6");
        bookAuthor.innerHTML = sessionStorage.getItem("author"+bookSave[i]);
        placeBlocSaveBook.appendChild(bookAuthor);

        bookDescription = document.createElement("p");
        bookDescription.innerHTML = sessionStorage.getItem("description"+bookSave[i]);
        placeBlocSaveBook.appendChild(bookDescription);

        const centerElement = document.createElement("div")
        centerElement.classList.add("center")
        bookPicture =document.createElement("img");
        bookPicture.src = sessionStorage.getItem("image"+bookSave[i]);
        centerElement.appendChild(bookPicture)
        placeBlocSaveBook.appendChild(centerElement)

                    if(heights < placeBlocSaveBook.offsetHeight){
                    heights = placeBlocSaveBook.offsetHeight;
                    console.log(placeBlocSaveBook.offsetHeight);
                    }
                }
                var allBlock = document.getElementsByClassName("infoSaveBook");
                for(i=0;i<allBlock.length;i++){
                    allBlock[i].style.height = heights - 2 + "px";
                }

    }




function reasearchPage(){
    structurePlace.classList.add("formularStructure");

    var textToImplement = document.createTextNode("Titre du livre");
    structurePlace.appendChild(textToImplement);

    const enterBookName = document.createElement("input");
    enterBookName.id = "bookName";
    structurePlace.appendChild(enterBookName);

    textToImplement = document.createTextNode("Auteur");
    structurePlace.appendChild(textToImplement);

    const enterAuthorName = document.createElement("input");
    enterAuthorName.id = "authorName";
    structurePlace.appendChild(enterAuthorName);

    const researchButton = document.createElement("button");
    textToImplement = document.createTextNode("Rechercher");
    researchButton.appendChild(textToImplement);
    researchButton.classList.add("btn");
    researchButton.addEventListener("click",async function(){
        PlaceReasearchResult.innerHTML="";
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q="+enterBookName.value+"+intitle&"+enterAuthorName.value+"+inauthor&maxResults=12");
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.response;
                console.log(data);
                const ligne = document.createElement("hr");
                PlaceReasearchResult.appendChild(ligne);
                if (data.totalItems>0){
                    const PlaceTextReasearchResult = document.createElement("h2");
                    const TextReasearchResult = document.createTextNode("Résultat de recherche");
                    PlaceTextReasearchResult.appendChild(TextReasearchResult);
                    PlaceReasearchResult.appendChild(PlaceTextReasearchResult);

                    const ReasearchPlaceResult = document.createElement("div");
                    PlaceReasearchResult.appendChild(ReasearchPlaceResult);
                    ReasearchPlaceResult.classList.add("research");

                    var heights = 0;

                    for(let i=0; i < (data.items.length); i++) {

                        const blocResult = document.createElement("div");
                        ReasearchPlaceResult.appendChild(blocResult);
                        blocResult.classList.add("infoBook");

                        const saveBook = document.createElement("a");
                        saveBook.classList.add("fa-solid");
                        saveBook.classList.add("fa-star");
                        saveBook.classList.add("fa-2xl");
                        saveBook.classList.add("iconPosition");
                        saveBook.addEventListener("click", function(){
                            if((sessionStorage.getItem(`id : ${data.items[i].id}`) != null)){
                                
                            }else{
                                const title = `titre : ${data.items[i].volumeInfo.title.slice(0,100)}`
                                const idBook = `id : ${data.items[i].id}`
                                sessionStorage.setItem("title"+idBook,title);
                                sessionStorage.setItem(idBook,idBook);
                                if(`auteur : ${data.items[i].volumeInfo.authors??"Inconnue"}` != 'auteur : Inconnue'){
                                    const author =`auteur : ${data.items[i].volumeInfo.authors[0]}`
                                    sessionStorage.setItem("author"+idBook,author);
                                }
                                else{
                                    const author =`auteur : Inconnue`
                                    sessionStorage.setItem("author"+idBook,author);
                                }
                                if (`${data.items[i].volumeInfo.description??"Information manquante"}` != 'Information manquante'){
                                    description = `${data.items[i].volumeInfo.description}`;
                                    sessionStorage.setItem("description"+idBook,description.slice(0,200));
                                }
                                else{
                                    sessionStorage.setItem("description"+idBook,`Information manquante`);
                                }
                                if(`${data.items[i].volumeInfo.imageLinks??"Inconue"}` != "Inconue"){
                                    sessionStorage.setItem("image"+idBook,`${data.items[i].volumeInfo.imageLinks.smallThumbnail}`);  
                                }
                                else{
                                    sessionStorage.setItem("image"+idBook,"C:/Users/-/Desktop/Cours OpenClassroom/Projet 6/Picture/unavailable.png"); 
                                }
                                bookSave.push(idBook);
                                maPochList();
                            }
                        })
                        blocResult.appendChild(saveBook);

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

                        const centerElement = document.createElement("div")
                        centerElement.classList.add("center")
                        bookPicture =document.createElement("img");
                        if(`${data.items[i].volumeInfo.imageLinks??"Inconue"}` != "Inconue"){
                            bookPicture.src =`${data.items[i].volumeInfo.imageLinks.smallThumbnail}`;
                        }
                        else{
                            bookPicture.src = "C:/Users/-/Desktop/Cours OpenClassroom/Projet 6/Picture/unavailable.png";
                        }
                        centerElement.appendChild(bookPicture)
                        blocResult.appendChild(centerElement)
                        if(heights < blocResult.offsetHeight){
                        heights = blocResult.offsetHeight;
                        console.log(blocResult.offsetHeight);
                        }
                    }
                    var allBlock = document.getElementsByClassName("infoBook");
                    for(i=0;i<allBlock.length;i++){
                        allBlock[i].style.height = heights - 2 + "px";
                    }
                }
                else{
                    const NoResultReasearch = document.createElement("h2");
                    const TextNoResultReasearch = document.createTextNode("Il n'y à pas de livre correspondant à votre requête");
                    NoResultReasearch.appendChild(TextNoResultReasearch);
                    PlaceReasearchResult.appendChild(NoResultReasearch);
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
            structurePlace.classList.remove("formularStructure")
            structurePlace.innerHTML="";
            loadPage();
        })
        buttonLoad.appendChild(textButtonLoad);
        structurePlace.appendChild(buttonLoad);

        const PlaceReasearchResult = document.createElement("div")
            structurePlace.appendChild(PlaceReasearchResult);
}

function loadPage(){
    if(btnActivate){
        reasearchPage();
    }
    else{
        firstPage();
    }
}

loadPage();