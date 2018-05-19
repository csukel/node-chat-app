// [{
//     id: '/#skldfjlkdsfj',
//     name: 'Loucas',
//     room: 'The brew fellas'
// }]

//addUser (id,name,room)
//removeUser(id)
//getUser(id)


class Users {
    constructor(){
        this.users = [];
    }

    addUser (id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    };

    removeUser (id){
        var index = this.users.findIndex((user)=> user.id === id );
        var user = this.users[index];
        if (index !== -1 )
            this.users.splice(index,1);
        return user;
        // return user that was removed
    }

    getUser (id){
        return this.users.find((user)=> user.id === id);
    }

    getUserList(room){
        var users = this.users.filter((user)=>user.room === room);
        var namesArray = users.map((user)=>{
            return user.name
        });
        return namesArray;
    }
}


module.exports = {
    Users
}