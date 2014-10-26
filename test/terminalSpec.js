var expect = require('chai').expect;
var Terminal = require(__dirname + '/../lib/terminal');

describe('terminal', function(){

	describe('parseArgs', function(){

		it('should throw an error if no passed arg', function(){
			var fn = function() { Terminal.parseArgs(); }
			expect(fn).to.throw(/terminal args is required./);
		});

		it('should throw an error if passed arg isn\'t an array', function(){
			var fn = function() { Terminal.parseArgs('string'); }
			expect(fn).to.throw(/terminal args must be an array./);
		});

		it('should parse args', function(){
			var argv = ['--environment=development', '--mode=2'];
			var result = Terminal.parseArgs(argv);
			expect(result).to.have.property('environment');
			expect(result).to.have.property('mode');
			expect(result.environment).to.be.equal('development');
			expect(result.mode).to.be.equal('2');
		});
	});

	describe('detectEnvironment', function(){

		it('should parse args if not parsed yet', function(){
			var argv = ['--environment=development'];
			var environment = Terminal.detectEnvironment(argv);
			expect(environment).to.equal('development');
		});

		it('should not parse args if it is already parsed', function(){
			var argv = ['--environment=production'];
			var result = Terminal.parseArgs(argv);
			var environment = Terminal.detectEnvironment(result);
			expect(environment).to.equal('production');
		});

		it('should validate that arguments is a valid object', function(){
			var fn = function() { Terminal.detectEnvironment('invalidEnvironment'); }
			expect(fn).to.throw(/terminal args should be an object or an array./);
		});

		it('should validate the existance of environment property', function(){
			var argv = ['--env=staging'];
			var fn = function() { Terminal.detectEnvironment(argv); }
			expect(fn).to.throw(/environment arg doesn\'t exit./);
		});

		it('should validate that environment property is either development, production or testing', function(){
			var argv = ['--e=staging'];
			var fn = function() { Terminal.detectEnvironment(argv); }
			expect(fn).to.throw(/environment arg is invalid./);
		});

		it('should return environment value', function(){
			var argv = ['--e=testing'];
			var environment = Terminal.detectEnvironment(argv);
			expect(environment).to.equal('testing');
		});
	});
});
