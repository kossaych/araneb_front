function OFFLINE(){
  return(
  <div style={{margin:10+'px','margin-top':150+"px","border":'solid 1px '}} className="p-5  d-flex justify-content-center align-items-center bg-success bg-opacity-75 ">
    <div>
    <h1>OFFLINE</h1><br />
    <h4>Please check your internet connection</h4><br />
    <a href="." className="btn btn-danger">RETRY</a>
    </div>
  </div>)
}
export default OFFLINE
