const list = document.querySelectorAll('.post-tags ul');
console.log(list);
for (let tags of list) {
    console.log(tags);
    const newTag = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = 'foo';
    newTag.appendChild(a);
    tags.appendChild(newTag);

    // tags.innerHTML = tags.innerHTML + '<li><a href="#">foo</a></li>'
}





// for (let authors of list) {
//             console.log(authors);
//             const newAuthor = document.createElement('li'); /*tworzenie li*/
//             /*tworzenie a, dodawanie atrybutu */
//             const a = document.createElement('a');
//             a.setAttribute('href', '#'); /*set - umieszczać, wstawiać*/

//             newAuthor.appendChild(a); /*dodajemy do listy li - a wraz z atrybutami */
//             authors.appendChild(newAuthor);
//         }