// const data = fetch('https://jsonplaceholder.typicode.com/todos/')
// data.then(function(res) {
//     console.log(res)
//     return res.json()
// }).then(function(res) {
//     console.log(res)
//     let container = document.getElementById("container")
//     const childs = res.map(function(item) {
//         return `
//         <div class="article">
//             <h1>${item.title}</h1>
//             <p>${item.id}</p>
//         </div>
//         `
//     });
//     console.log(container)
//     container.innerHTML = childs.join("")
// }).catch(function(err){
//     console.log("loi", err)
// }).finally(function() {
//     console.log("finally")
// })

const data = fetch('https://jsonplaceholder.org/posts?fbclid=IwAR0_VQtdCKYe5X3y7u0aIunN86gXsNOG10sCJRCRsT6MdGkboTihpQlncxI')
data.then(function(res){
    return res.json()
}).then(function(res){
    let container = document.getElementById("container")
    const child = res.map(function(item){
        return `
            <div class="child">
                <div class="img-thumbanail">
                    <img src=${item.image} alt="">
                </div>
                <div class="content">
                    <div class="status">
                        <p>${item.status}</p>
                    </div>
                    <h3 class="title">${item.title}</h3>
                    <p class="description">${item.content}</p>
                </div>
                <div class="more-info">
                    <div class="index">
                        <div class="userId">
                            <p>${item.userId}</p>
                        </div>
                    </div>
                    <p class="publishedAt">Publish: ${item.publishedAt}</p>
                    <p class="updateAt">Update: ${item.updatedAt}</p>
                </div>
                <div class="function-btn">
                    <div class="update-btn">
                        <p>Update</p>
                        <i class="fas fa-pen"></i>
                    </div>
                    <div class="delete-btn">
                        <p>Delete</p>
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        `;
    })
    container.innerHTML = child.join("");
}).catch(function(err){
    console.log("Loi ", err)
}).finally(function(fin){
    console.log("ok")
})
