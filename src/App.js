import {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import RepoDetails from "./RepoDetails";
function App() {
  const [username,setUsername]=useState("");
  const [loading,setLoading]=useState(false);
  const [repos,setRepos]=useState([]);
  const [details,setDetails]=useState({});
  const [branch,setBranch]=useState([]);
  const [commit,setCommit]=useState([]);
  const [issue,setIssues]=useState([]);
  const [detailsLoading,setDetailsLoading]=useState(false);
  useEffect(()=>{
    setRepos([]);
    setDetails({});
  },[username]);
  
  function handleSubmit(e){
    e.preventDefault();
    searchRepos();
  };
  function searchRepos(){
    setLoading(true);
    axios({
      method:"get",
      url:`https://api.github.com/users/${username}/repos`,
    }).then(res=>{
      setLoading(false);
      setRepos(res.data);
    })
  }
  function renderRepo(repo)
  {
    return(
      <div className="row" onClick={()=>getDetails(repo.name)}key={repo.id}>
        <h2 className="repo-name">
          {repo.name}
        </h2>
        <p className="desc">
        {repo.description}
        </p>
      </div>
    );
  }
  function getDetails(repoName){
    setDetailsLoading(true);
    axios({
      method:"get",
      url:`https://api.github.com/repos/${username}/${repoName}/branches`
    }).then(res=>{
      setDetailsLoading(false);
      setBranch(res.data);
    });
    axios({
      method:"get",
      url:`https://api.github.com/repos/${username}/${repoName}`
    }).then(res=>{
      setDetailsLoading(false);
      setDetails(res.data);
    });
    axios({
      method:"get",
      url:`https://api.github.com/repos/${username}/${repoName}/commits`
    }).then(res=>{
      setDetailsLoading(false);
      setCommit(res.data);
    });
    axios({
      method:"get",
      url:`https://api.github.com/repos/${username}/${repoName}/issues`
    }).then(res=>{
      setDetailsLoading(false);
      setIssues(res.data);
    });
  }
  return (
    <div className="page">
      <div className="heading">
        GITHUB BROWSER
      </div>
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input          
             className="input"
             value={username}
             placeholder="Github Username"
             onChange={e=>setUsername(e.target.value)}
            />
           <button className="button" onClick={handleSubmit}>{loading?"Searching...":"Search"}</button>
          </form>
          <div className="results-container">
            {repos.map(renderRepo)}
          </div>
        </div>
        <RepoDetails issues={issue} commits={commit} branches={branch} details={details} loading={detailsLoading}/>
      </div>
    </div>
  );
}
export default App;