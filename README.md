# gdc
Experimenting with Genomic Data Commons [gdc.cancer.gov](https://gdc.cancer.gov). To play with the library in this repository  have a go at the browser’s console at [mathbiol.github.io/gdc](https://mathbiol.github.io/gdc). This tool builds on a similar initiative to operate cBio’s API at [github.com/mathbiol/cbio](https://github.com/mathbiol/cbio).
___

### get
the core function that is operated by other GET calls

````javascript
gdc.get=function(endPoint,query,callbackFunction)
````
it also supports JS promises,

````javascript
gdc.get=function(endPoint,query).then(callbackFunction)
````

like all other operators described here, for example, these three  expressions are equivalent:

````javascript

gdc.get(’status’,console.log)
gdc.status(console.log)
gdc.status().then(console.log)

````

### status

Retrieves status of NCI’s GDC API endpoint.

````javascript
gdc.status(callbackFunction)
````

the response will be something like

````JSON
{
   "commit": "23e5f2ae47eecadec62b6eca8a117e906b22c946",
   "data_release": "Data Release 8.0 - August 22, 2017",
   "status": "OK",
   "tag": "1.10.0",
   "version": 1
}
````
