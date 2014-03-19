LICENSE_COMMENT="/*! ary 0.1.0 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */"

cover: lint dist
	@./node_modules/.bin/istanbul cover -x "**/spec/**" \
		./node_modules/mocha/bin/_mocha --report lcov spec/ -- -R spec

coveralls:
	@rm -rf ./coverage
	@./node_modules/.bin/istanbul cover -x "**/spec/**" \
		./node_modules/mocha/bin/_mocha --report lcovonly spec/ -- -R spec && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
	@rm -rf ./coverage

test: lint dist
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.spec.js

clean:
	@rm -f 	dist/*

dist/ary.js:
	@echo $(LICENSE_COMMENT) > dist/ary.js
	@cat src/ary.js >> dist/ary.js

dist/ary.globals.js:
	@echo $(LICENSE_COMMENT) > dist/ary.globals.js
	@echo "(function(root){\
	var require=function(key){return root[key];},\
	module={};" >> dist/ary.globals.js
	@cat src/ary.js >> dist/ary.globals.js
	@echo "root.ary = module.exports;\
	}(this));" >> dist/ary.globals.js

dist/ary.amd.js:
	@echo $(LICENSE_COMMENT) > dist/ary.amd.js
	@echo "define(function(require, exports, module) {" >> dist/ary.amd.js
	@cat src/ary.js >> dist/ary.amd.js
	@echo "return module.exports;});" >> dist/ary.amd.js

dist/ary.min.js: dist/ary.js
	@./node_modules/.bin/uglifyjs dist/ary.js --comments -m > dist/ary.min.js

dist/ary.globals.min.js: dist/ary.globals.js
	@./node_modules/.bin/uglifyjs dist/ary.globals.js --comments -m > dist/ary.globals.min.js

dist/ary.amd.min.js: dist/ary.amd.js
	@./node_modules/.bin/uglifyjs dist/ary.amd.js --comments > dist/ary.amd.min.js

dist: clean dist/ary.min.js dist/ary.globals.min.js dist/ary.amd.min.js

lint:
	@./node_modules/.bin/jshint src/ary.js spec
