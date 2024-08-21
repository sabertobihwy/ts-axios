import {
  extend,
  isDate,
  isFormData,
  isPlainObject,
  isURLSearchParams
} from '../../src/helpers/util'

describe('heplers:util',()=>{
  describe('isXX',()=>{
    test('should validate Date',()=>{
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObj',()=>{
      expect(isPlainObject({} )).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate FormData',()=>{
      expect(isFormData(new FormData() )).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams',()=>{
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })
  })
})

describe('extend',()=>{
  test('should be mutable',()=>{
    const a = Object.create(null)
    const b = {
      foo: 1
    }
    extend(a,b)
    expect(a.foo).toBe(1)
  })
  test('should extend properties',()=>{
    const a = {
      foo: 123,
      bar: 456
    }
    const b = {
      bar: 789
    }
    extend(a,b)
    expect(a.bar).toBe(789)
  })
})
