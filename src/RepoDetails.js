import React, {useState,useEffect} from "react";
import "./RepoDetails.css";

function RepoDetails({issues,commits,branches,details,loading}){
    const [bookrepos,setbookRepos]=useState([]);
    if(loading)
    {
        return(
            <h1 className="loader">Loading...</h1>
        );
    }
    const addRepohandler=async (repoTitle,repoBody)=>{
        try{
            const newRepo={
                repoTitle: repoTitle,
                repoBody: repoBody
            };
            let haserror=false;
            const response=await fetch('https://localhost:5000/repoAdd',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                }
            });
            if(!response.ok)
            {
                haserror=true;
            }
            const repoData=await response.json();
            if(haserror)
            {
                throw new Error(repoData.message);
            }
            /*setbookRepos(prevRepos=>{
                return prevRepos.concat({
                    ...newRepo,
                    id:repoData.id
                });
            });*/
        }
        catch(error){
            alert(error.message||'something went wrong');
        }
    }
    return(
        <div className="repo-details-container">
            <div className="details-row">
                <label className="label">Name:</label>
                <span className="value">{details.name}</span>
            </div>
            <div className="details-row">
                <label className="label">Forks Count:</label>
                <span className="value">{details.forks}</span>
            </div>
            <div className="details-row">
                <label className="label">Language:</label>
                <span className="value">{details.language}</span>
            </div>
            <div className="details-row">
                <label className="label">Issues:</label>
                <span className="value">{details.open_issues_count}</span>
            </div>
            <div className="details-row">
                <label className="label">Branches:</label>
                <ol>
                {branches.map((b)=><li className="value">{b.name}</li>)}
                </ol>
            </div>
            <div className="details-row">
                <label className="label">Commits:</label>
                <ol>
                {commits.map((c)=><li className="value">{c.commit.message}</li>)}
                </ol>
            </div>
            <div className="details-row">
              <form class="" action="/repoAdd" method="post">
               <div class="form-group">
               <div>
               <label class="repoadd">REPOSITORY NAME</label>
               <hr/>
                <input class="form-control" type="text" name="repoTitle" required />
                 </div>
                 <div>
                  <label class="repoadd">REPOSITORY DESCRIPTION</label>
                  <hr/>
                  <textarea class="form-control" name="repoBody" rows="5" cols="30" required></textarea>
                 </div>
                <button type="button" class="button addbtn" onClick={addRepohandler}>Add Repository</button>
               </div>
            </form>
          </div>
        </div>
    );
}
export default RepoDetails;