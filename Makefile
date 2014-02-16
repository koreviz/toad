##
# Toad Make
# Copyright 2014 Koreviz
# MIT Licensed
##
SHELL := /bin/bash

MOCHA = $(shell find node_modules -name "mocha" -type f)
REPO = koreviz/toad
REPORTER = spec
REPORTER_COV = html-cov
UI = exports

all: configure

clean:
	rm -fr node_modules

configure:
	npm install

push:
	rm -fR .git
	git init
	git add .
	git commit -m "Initial release"
	git remote add origin gh:$(REPO).git
	git push origin master

test:
	$(MOCHA) -R $(REPORTER) -u $(UI)

.PHONY: test