var Terminal = {};

Terminal.parseArgs = function(argv){

	if(!argv)
		throw new Error('terminal args is required.');

	if(!(argv instanceof Array))
		throw new Error('terminal args must be an array.');

	var arguments = {};

	for(var i = 0; i < argv.length; i++)
	{
		if(argv[i].match(/^\-\-.+\=.+/gi))
		{
			var arg = argv[i].replace('--','').split('=');
			arguments[arg[0]] = arg[1];
		}
	}

	return arguments;
};

Terminal.detectEnvironment = function(argv){
	var arguments;

	if(argv instanceof Array)
		arguments = this.parseArgs(argv);
	else
		arguments = argv;

	if(typeof arguments != 'object')
		throw new Error('terminal args should be an object or an array.');

	if(!('environment' in arguments) && !('e' in arguments) && !arguments.environment && !arguments.e)
		throw new Error('environment arg doesn\'t exit.');

	if(!arguments.environment)
		arguments.environment = arguments.e;

	if(arguments.environment != 'development' && arguments.environment != 'production' && arguments.environment != 'testing')
		throw new Error('environment arg is invalid.');

	return arguments.environment;
};

module.exports = Terminal;
