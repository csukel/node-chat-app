var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage',()=>{
    it('should generate correct location message object',()=>{
        var from = 'Loucas',
            latitude = '1',
            longitude = '2';
        const url = `https://google.com/maps?q=${latitude},${longitude}`;
        var res = generateLocationMessage(from,latitude,longitude);
        expect(res).toInclude({
            from,
            url
        })
        expect(res.createdAt).toBeA('number');
    })
})