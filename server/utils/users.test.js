const expect = require('expect');

const {Users} = require('./users');



describe('Users',()=>{

    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'July',
            room: 'Java Course'
        },{
            id: '3',
            name: 'Nike',
            room: 'Node Course'
        }]
    })
    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id: '345',
            name: 'Loucas',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    })

    it('should remove a user',()=>{
        var res = users.removeUser('1');
        expect(res).toBeTruthy;
        expect(res.name).toBe('Mike');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        var res = users.removeUser('400');
        expect(res).toBeFalsy;
        expect(users.users.length).toBe(3);
    })

    it('should return a specific user according to the provided id',()=>{
        var res = users.getUser('1');
        expect(res).toBeTruthy;
        expect(res.name).toBe('Mike');
    })

    it('should not find a user',()=>{
        var res = users.getUser('200');
        expect(res).toBeFalsy;
    })
    it('should get the users list related to the provided room',()=>{
        var res = users.getUserList('Node Course');
        expect(res).toEqual(['Mike','Nike'])
        expect(res.length).toBe(2);
    })
})