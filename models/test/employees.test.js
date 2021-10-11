const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
    mongoose.models = {};
  });
describe('Employee', () => {
    it('should throw an error if no arg', () =>{
        const emp = new Employee({});
        emp.validate(err =>{
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if "firstName", "lastName", "department" is not a string', () => {
        const emp = new Employee({firstName: [], lastName: {}, department: []});
        emp.validate(err =>{
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if not all arguments are passed', () => {
        const cases = [
            {firstName: 'John', department: 'IT'}, 
            {lastName: 'Doe', department: 'IT'}, 
            {firstName: 'John', lastName: 'Doe'}
        ];
        for(let employee of cases){
            const emp = new Employee(employee);
            emp.validate(err => {
                expect(err.errors).to.exist;
            })
        }
    });

    it('should not throw an error if "firstName", "lastName", "department" are OK', () => {
        const emp = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT'});
        emp.validate(err =>{
            expect(err).to.not.exist;
        });
    })
});