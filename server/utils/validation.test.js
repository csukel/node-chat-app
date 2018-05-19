const expect = require('expect');

var {isRealString} = require('../utils/validation');

describe('isRealString',()=>{
    //should reject non-string values
    it('should reject non-string values',()=>{
        expect(isRealString(1)).toBeFalsy;
    })
    
    //should reject string with only spaces
    it('should reject string with only spaces',()=>{
        expect(isRealString('       ')).toBeFalsy;
    })
        
    //should allow strings with non-space characters
    it('should allow strings with non-space characters',()=>{
        expect(isRealString('This is a real string')).toBeTruthy;
    })
})