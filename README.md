# KCC Athletics Site Development

Development of the new KCC Athletics site based off of design mockups

Jekyll + Gulp + Sass + Yarn + BrowserSync + ...

## [Live Github Pages example](https://kankakeecommunitycollege.github.io/athletics-mockup/):

### <https://kankakeecommunitycollege.github.io/athletics-mockup/>

## Requirements
	- Jekyll - `$ gem install jekyll bundler`
	- Bundler - `$ gem install bundler`
	- Nodejs - I recommend using NVM (Node Version Manager): https://github.com/creationix/nvm
	- .nvmrc file in this repo will make NVM use Node v8.9.4 (to avoid compatibility issues)
	-	Or if you must - Use the installer: https://nodejs.org/
	- Gulp - `$ npm install --global gulp-cli` - mac users may need sudo

## Installation
	$ git clone https://github.com/KankakeeCommunityCollege/athletics-mockup.git
	$ cd athletics-mockup
	$ npm install		// May need to prefix command with sudo (if not using NVM)
	$ bundle install

## Development
	$ gulp

## Production
	$ gulp --production
