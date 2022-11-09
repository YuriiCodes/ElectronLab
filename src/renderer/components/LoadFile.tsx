import React, {Component} from "react";

export class LoadFile extends Component {
  private fileInputRef: React.RefObject<unknown>;
  constructor(props: any) {
    super(props);
    this.fileInputRef = React.createRef();
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-white">File load</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);

          // @ts-ignore
          const selectedFilePath = this.fileInputRef.current.files[0].path;
          window.electron.ipcRenderer.sendMessage('xml-uploaded', [selectedFilePath]);
          debugger;
          alert(
            // @ts-ignore
            `Selected file - ${this.fileInputRef.current.files[0].name}`
          );
        }}>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label text-white">Please, select the XML file:</label>
            {/*// @ts-ignore*/}
            <input className="form-control" type="file" accept="text/xml" id="formFile" ref={this.fileInputRef}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
