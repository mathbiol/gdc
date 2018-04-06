console.log('gdc.js loaded at '+Date());

// Genome data commons API info at https://gdc.cancer.gov/developers
// API docs https://docs.gdc.cancer.gov/API/Users_Guide/Getting_Started/#api-endpoints

gdc=function(url){
    gdc.url=url||'https://api.gdc.cancer.gov'
    // for older versions url would use the template https://api.gdc.cancer.gov/<version>/legacy/
    // ini
    gdc.div = document.getElementById('gdcDiv')
    //if(gdc.div){
    //    gdc.div.innerHTML='Cancer Genome Commons loaded :-)'
    //}
}

gdc.parms2query=function(pp){ // convert JSON query object into a query string
    if(typeof(pp)=='object'){
        var q='?'
        keys(pp).forEach(function(p){
            q+=`${p}=${pp[p]}&`
        })
        q=q.slice(0,-1) // to remove trailing &
    }else{ // pp is already a string or may be null, jut pass it on as is
        q=pp 
    }
    return q
}

gdc.query2parms=function(qq){ // convert query string into JSON query object
    if(qq[0]=="?"){qq=qq.slice(1)} // in case query string is prefized with '?', remove it
    pp={}
    qq.split('&').forEach(function(q){
        q = q.split('=')
        pp[q[0]]=q[1]
        4
    })
    return pp
}

gdc.get=function(endPoint,q,fun){
    endPoint=endPoint||'status' // get status by default
    q=q||''
    q=gdc.parms2query(q)
    //if(q.length>0){q='/'+q}
    if(fun){
        return $.getJSON(gdc.url+'/'+endPoint+q).then(fun)
    }else{
        return $.getJSON(gdc.url+'/'+endPoint+q)
    }
}

// ENDPOINTS
// https://docs.gdc.cancer.gov/API/Users_Guide/Getting_Started/#api-endpoints
// following the list of endpoints listed in that page

gdc.status=function(fun){ // to get the status in the console, one could do gdc.status(console.log)
    return gdc.get('status',null,fun) // no query parms for status calls
}

gdc.projectList=function(q,fun){ // list of project
    // https://docs.gdc.cancer.gov/API/Users_Guide/Search_and_Retrieval/#project-endpoint
    // for example https://api.gdc.cancer.gov/projects?from=0&size=2&sort=project.project_id:asc&pretty=true
    // would be gdc.projectList({from:0,size:2,sort:"project.project_id:asc",pretty:true})
    return gdc.get('projects',q,fun)
}

gdc.project=function(prj,q,fun){ // list of project
    // https://docs.gdc.cancer.gov/API/Users_Guide/Search_and_Retrieval/#project-endpoint
    // for example https://api.gdc.cancer.gov/projects/TARGET-NBL?expand=summary,summary.experimental_strategies,summary.data_categories&pretty=true
    // would be gdc.project("TARGET-NBL",{expand:"summary,summary.experimental_strategies,summary.data_categories",pretty:true})
    return gdc.get('projects/'+prj,q,fun)
}

gdc.caseList=function(q,fun){ // list of project
    // https://docs.gdc.cancer.gov/API/Users_Guide/Search_and_Retrieval/#cases-endpoint
    // for example https://api.gdc.cancer.gov/projects?from=0&size=2&sort=project.project_id:asc&pretty=true
    // would be gdc.projectList({from:0,size:2,sort:"project.project_id:asc",pretty:true})
    return gdc.get('cases',q,fun)
}

gdc.case=function(prj,q,fun){ // list of project
    // https://docs.gdc.cancer.gov/API/Users_Guide/Search_and_Retrieval/#project-endpoint
    // for example https://api.gdc.cancer.gov/projects/TARGET-NBL?expand=summary,summary.experimental_strategies,summary.data_categories&pretty=true
    // would be gdc.project("TARGET-NBL",{expand:"summary,summary.experimental_strategies,summary.data_categories",pretty:true})
    return gdc.get(' cases/'+prj,q,fun)
}

setTimeout(gdc,0) // change this to check for jQuery availability

//https://gdc-api.nci.nih.gov/projects
