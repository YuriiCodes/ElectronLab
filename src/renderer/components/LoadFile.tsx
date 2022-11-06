export const LoadFile = () => {
  window.electron.ipcRenderer.sendMessage('xml-uploaded', ["hello"]);
  return (
    <div className="container">
      <h1 className="text-white">File load</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label text-white">Please, select the XML file:</label>
          <input className="form-control" type="file" accept="text/xml" id="formFile" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
