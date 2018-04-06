# gdc

live at [mathbiol.github.io/gdc/](https://mathbiol.github.io/gdc/)!

Experimenting with Genomic Data Commons [gdc.cancer.gov](https://gdc.cancer.gov). To play with the library in this repository  have a go at the browser’s console at [mathbiol.github.io/gdc/](https://mathbiol.github.io/gdc/). This tool builds on a similar initiative to operate cBio’s API at [github.com/mathbiol/cbio](https://github.com/mathbiol/cbio).
___

### .get
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

### .status

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

#### .projectList

````javascript
projectList=function(query,callbackFunction)

````

As other operators, the <i>query</i> constraints can be provided as a string os a JSON structure, say  

````javascript
gdc.projectList({from:0,size:2,sort:”project.project_id:asc”})
   .then(x=>{y=x})
````
 will store the response in a external object, y which can then be manipulated outside the callback function. For example call, y will be something like

````JSON
{
   "data": {
      "hits": [
         {
            "dbgap_accession_number": null,
            "disease_type": [
               "Liver Hepatocellular Carcinoma"
            ],
            "released": true,
            "state": "legacy",
            "primary_site": [
               "Liver"
            ],
            "project_id": "TCGA-LIHC",
            "id": "TCGA-LIHC",
            "name": "Liver Hepatocellular Carcinoma"
         },
         {
            "dbgap_accession_number": null,
            "disease_type": [
               "Head and Neck Squamous Cell Carcinoma"
            ],
            "released": true,
            "state": "legacy",
            "primary_site": [
               "Head and Neck"
            ],
            "project_id": "TCGA-HNSC",
            "id": "TCGA-HNSC",
            "name": "Head and Neck Squamous Cell Carcinoma"
         }
      ],
      "pagination": {
         "count": 2,
         "sort": "project.project_id:asc",
         "from": 0,
         "page": 1,
         "total": 39,
         "pages": 20,
         "size": 2
      }
   },
   "warnings": {}
}

````

and once you have the list of projects with their ids you can dig in,

#### .project

````javascript
gdc.project(project_id,query,callbackFunction)
````
for example 

````javascript
gdc.project("TARGET-NBL",{expand:"summary,summary.experimental_strategies,summary.data_categories"})
````

which will push an object like this to your callbackFunction:

````javascript
{
   "data": {
      "dbgap_accession_number": "phs000467",
      "disease_type": [
         "Neuroblastoma"
      ],
      "summary": {
         "data_categories": [
            {
               "case_count": 7,
               "file_count": 1,
               "data_category": "Clinical"
            },
            {
               "case_count": 1127,
               "file_count": 3,
               "data_category": "Biospecimen"
            },
            {
               "case_count": 151,
               "file_count": 471,
               "data_category": "Transcriptome Profiling"
            },
            {
               "case_count": 216,
               "file_count": 1732,
               "data_category": "Simple Nucleotide Variation"
            },
            {
               "case_count": 270,
               "file_count": 599,
               "data_category": "Raw Sequencing Data"
            }
         ],
         "case_count": 1127,
         "file_count": 2806,
         "experimental_strategies": [
            {
               "case_count": 221,
               "file_count": 2174,
               "experimental_strategy": "WXS"
            },
            {
               "case_count": 151,
               "file_count": 628,
               "experimental_strategy": "RNA-Seq"
            }
         ],
         "file_size": 8157614402888
      },
      "released": true,
      "state": "legacy",
      "primary_site": [
         "Nervous System"
      ],
      "project_id": "TARGET-NBL",
      "name": "Neuroblastoma"
   },
   "warnings": {}
}
````

#### .caseList

The same pattern used for retrieving projects can be applied to retrieving lists of cases,

````javascript
gdc.caseList(query,callbackFunction)
````

as well as individual cases

#### .case

````javascript
gdc.case(case_id,query,callbackFunction)
````

…

___

more operating being developed as needed by the analytical Web Applications targeting (mostly TCGA) data hosted at NCI’s GDC end point
___

