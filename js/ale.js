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