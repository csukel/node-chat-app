var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = 'Loucas',
            text = 'Hi';
        //store res in variable
        var res = generateMessage(from,text);
        //assert from match
        expect(res.from).toBe(from);
        //assert text match
        expect(res.text).toBe(text);
        //assert both of the above in one statement
        expect(res).toInclude({from,text});
        //assert createdAt is number
        expect(res.createdAt).toBeA('number');
    })
})