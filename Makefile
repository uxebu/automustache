all: encode_mustache compile_js

encode_mustache:
	/bin/echo -n "var mustache='data:image/png;base64," > src/mustache.js
	base64 img/mustache.png | tr -d '\n' >> src/mustache.js
	/bin/echo -n "';" >> src/mustache.js

compile_js:
	closure --js lib/face.js \
			--js lib/ccv.js \
			--js src/mustache.js \
			--js src/automustache.js \
			--js_output_file all.min.js