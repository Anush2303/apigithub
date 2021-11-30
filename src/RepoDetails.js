function RepoDetails({issues,commits,branches,details,loading}){
    if(loading)
    {
        return(
            <h1 className="loader">Loading...</h1>
        );
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
        </div>
    );
}
export default RepoDetails;