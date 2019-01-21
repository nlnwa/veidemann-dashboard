VEIDEMANN_API_VERSION=v1.0.0-beta1
PROTOC_VERSION=3.6.1
GRPC_WEB_VERSION=1.0.3

.PHONY: all
.PHONY: clean
.PHONY: distclean

all:	tools veidemann-api build

clean:
	rm -rf protobuf include veidemann-api

distclean: clean
	rm -rf tools

tools:
	mkdir tools
	cd tools \
	&& wget -q https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip \
	&& unzip protoc-${PROTOC_VERSION}-linux-x86_64.zip \
	&& rm protoc-${PROTOC_VERSION}-linux-x86_64.zip \
	&& wget -q https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-linux-x86_64 \
	&& chmod +x protoc-gen-grpc-web-${GRPC_WEB_VERSION}-linux-x86_64

build: veidemann-api
	rm -rf ../src/api
	mkdir -p ../src/api
	find veidemann-api -name *.proto -exec 'tools/bin/protoc' '-Iveidemann-api/protobuf' '-Iveidemann-api/include' '-Itools/include' \
	  '--plugin=protoc-gen-grpc-web=tools/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-linux-x86_64' \
	  '--js_out=import_style=commonjs:../src/api' \
	  '--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../src/api' '{}' ';'

veidemann-api: tools
	git clone --depth=1 --branch ${VEIDEMANN_API_VERSION} git@github.com:nlnwa/veidemann-api.git
