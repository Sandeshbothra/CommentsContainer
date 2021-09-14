const USERS = [{id:"1",name:"Alex", avatar:"teal"},{id:"2",name:"Sid", avatar:"orange"},{id:"3",name:"Emma", avatar:"Green"}];
let comments = [];
(function(){
    let userDEl = document.querySelector('select[name=users] options');
    // USERS.forEach(user => {
    //     let optionEl = document.createElement('option');
    //     optionEl.setAttribute('value', user.id);
    //     optionEl.innerText = user.name;
    //     userDEl.appendChild(optionEl);

    // })

    let commentButtonEl = document.querySelector('#comment-btn');
    commentButtonEl.addEventListener('click', addComment);


})();


function addComment(){
    let selectedUser = USERS.find((user) => {
        return user.id === document.querySelector('select[name=users]').value
    });
    let userComment = document.querySelector('textarea[name=comment_box]').value;

    let comment = {id:Math.floor(Math.random(5) * 10000), description:userComment, user:selectedUser, childrean:[], likes:0}
    let commentsEl = document.querySelector('#comments');
    commentsEl.appendChild(createCommentEl(comment));
    comments.push(comment);
}


function createCommentEl(comment){
    let comEl = document.createElement('li');
    comEl.setAttribute('id', comment.id);
    comEl.appendChild(addAvtar(comment.user));
    comEl.appendChild(addName(comment.user.name))
    comEl.appendChild(addCommentText(comment.description))
    comEl.appendChild(addCommentActions(comment))
    if(comment.childrean.length > 0){
        addReplies(comment.childrean, comEl);
    }
    return comEl;
}

function addAvtar({name, avatar}){
    let avtarEl = document.createElement('div');
    avtarEl.innerText = name[0];
    avtarEl.setAttribute('class', `${avatar} avtar`);
    return avtarEl;
}

function addName(name){
    let nameEl = document.createElement('div')
    nameEl.innerText = name;
    return nameEl;
}

function addCommentText(comment){
    let textEl = document.createElement('div')
    textEl.innerText = comment;
    return textEl;
}

function addCommentActions(comment){
    let actionEl = document.createElement('div');
    actionEl.setAttribute('class', 'comment-action')
    let likeCounter = document.createElement('div');
    likeCounter.setAttribute('class', 'counter');
    likeCounter.innerText = `${comment.likes}`;

    let likeButton = document.createElement('div');
    let unlikeButton = document.createElement('div')
    let replyButton = document.createElement('div');
   
    likeButton.addEventListener('click', increamentLike.bind(comment));
    unlikeButton.addEventListener('click', decrementLike.bind(comment));
    replyButton.addEventListener('click', addReplyEl.bind(comment));

    likeButton.innerHTML = `&and;`;
    unlikeButton.innerHTML = `&or;`;
    replyButton.innerText = "Reply";

    actionEl.appendChild(likeCounter);
    actionEl.appendChild(likeButton);
    actionEl.appendChild(unlikeButton);
    actionEl.appendChild(replyButton)
    return actionEl;

}

function increamentLike(){
    let comment = this;
    comments.forEach((com) => {
        if(comment.id === com.id){
            com.likes += 1;
        }
    });
    let commentEl = document.getElementById(comment.id);
    let counterEl = commentEl.querySelector('.counter');
    counterEl.innerText =  parseInt(counterEl.innerText) + 1; 
}

function decrementLike(){
    let comment = this;
    comments.forEach((com) => {
        if(comment.id === com.id && com.likes > 0){
            com.likes -= 1;
        }
    });
    let commentEl = document.getElementById(comment.id);
    let counterEl = commentEl.querySelector('.counter');
    counterEl.innerText =  parseInt(counterEl.innerText) > 0 ? parseInt(counterEl.innerText) - 1 : 0; 
}

function addReplyEl(){
    let comment = this;
    let commentEl = document.getElementById(comment.id);
    let replyInputEl = document.createElement('textarea');
    let repluUserEl = document.createElement('select');
    repluUserEl.setAttribute('name',`reply_user_${comment.id}`)
    replyInputEl.setAttribute('name', `reply_${comment.id}`);
    // USERS.forEach(user => {
    //     let optionEl = document.createElement('option');
    //     optionEl.
    //     optionEl.innerText = user.name;
    //     repluUserEl.appendChild
    // })
    replyInputEl.addEventListener('input', addReply.bind(comment));
    commentEl.appendChild(replyInputEl);
}

function addReplies(replies, el){
    replies.forEach((reply) => {
        el.appendChild(createCommentEl(reply))
    });
}

function addReply(event){
    if(event.data == null){
        let commentEl = document.getElementById(this.id)
        let reply = 'Hi'
        //let user = document.querySelector(`select[name=reply_user_${this.is}`).value;
        comments.forEach(com => {
            if(com.id === this.id){
                com.childrean.push({id:Math.floor(Math.random(5) * 10000), description:reply, childrean:[], likes:0});
            }
        })

        createCommentEl({id:Math.floor(Math.random(5) * 10000), description:reply, childrean:[], likes:0})
    }
    
    
}