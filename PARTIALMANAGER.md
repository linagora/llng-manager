This document is to explain how to setup a lemonLDAP manager with the new interface and a partial configuration.

# Building the front end :

This part is to do in a terminal located in this git repository.

Assuming that you already installed all the packages using `npm install`, you need to build the partial manager. For that, there is a script already :
`npm run build-partial`

## Warning

This will build the manager assuming your manager url is "manager.example.com". If the base url is different, you need to change in the _package.json_ file the REACT_APP_BASEURL enviroment variable to your url.

# Putting the build in the manager

Once the new manager is built, you need to add it to your lemonLDAP.

First you need to copy the static file to the `lemonldap/lemonldap-ng-manager/site/htdocs/static` and start the llng server in another terminal.

```shell
cp build/static/* yourPathToLLNG/lemonldap-ng-manager/site/htdocs/static/ -r
```

```shell
make start_web_server
```

Then you need to add the index.html file as partial.html in the `e2e-test/conf/manager/` folder

```shell
cp build/index.html yourPathToLLNG/e2e-test/conf/manager/partial.html
```

Finally in the `e2e-tests/conf/manager-apache2.X.conf` file, you need to replace this line (line 43)

```conf
RewriteCond "%{REQUEST_URI}" "!^/(?:static|doc|lib|javascript|favicon).*"
```

by

```conf
RewriteCond "%{REQUEST_URI}" "!^/(?:static|doc|lib|javascript|favicon|partial\.html).*"
```

Then you only need to reload the web server using `make reload_web_server` and access http://yourManagerURL/partial.html
