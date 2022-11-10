import React, {Component} from "react";
import { JSONTree } from 'react-json-tree';



type GroupInfo = {
  name: string,
  department: string,
  branch: string,
  chair: string,
  day: string,
  time: string,
  headman: string,
  course: string,
  subject: string,
  leader: string,
}
type JsonTreeProps = {
  scientistpersonnel: {
    group: GroupInfo[]
  }
}
interface Props{
  json: JsonTreeProps
  isJsonLoaded: boolean
}
interface State{
}

export class LoadFile extends Component<Props, State>  {
  private readonly fileInputRef: React.RefObject<unknown>;
  private readonly  theme  = {
  scheme: 'apathy',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#031A16',
  base01: '#0B342D',
  base02: '#184E45',
  base03: '#2B685E',
  base04: '#5F9C92',
  base05: '#81B5AC',
  base06: '#A7CEC8',
  base07: '#D2E7E4',
  base08: '#3E9688',
  base09: '#3E7996',
  base0A: '#3E4C96',
  base0B: '#883E96',
  base0C: '#963E4C',
  base0D: '#96883E',
  base0E: '#4C963E',
  base0F: '#3E965B'
};
  private  json  = {
    scientistpersonnel: {
      group: [
        {
          name: 'Linear Algrebra',
          faculty: { department: 'Mathematics', branch: 'Mathematical Analysis' },
          chair: 'Professor, Doctor of Technical Sciences, Professor of the Department of Computer Science and Engineering',
          day: 'Wednesday',
          time: '18:00',
          headman: 'Alexander the great',
          orientation: {
            course: 'Linear algebra basics',
            subject: 'Computer Science'
          },
          leader: 'Kozlovsky Alexander'
        },
        {
          name: 'Calculus',
          faculty: {
            department: 'Computer Science',
            branch: 'Software engineering'
          },
          chair: 'Professor, Doctor of Multivariate Analysis and complex functions',
          day: 'Monday',
          time: '12:40',
          headman: 'John Doe',
          orientation: { course: 'Calculus 1', subject: 'Computer Science' },
          leader: 'Steve Green'
        }
      ]
    }
  }

  constructor(props: any) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      json: this.json
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h1 className="text-white">File load</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
              // @ts-ignore
              const selectedFilePath = this.fileInputRef.current.files[0].path;
              window.electron.ipcRenderer.sendMessage('xml-uploaded', [selectedFilePath]);
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
          <div className="col-8">
            <h2 className="text-white">File preview</h2>
            {/*@ts-ignore*/}
            <JSONTree data={this.props.json || {}} theme={this.theme}  />
             {/*<div><pre>{JSON.stringify(this.props.json || {}, null, 2) }</pre></div>;*/}
          </div>
        </div>
        <div className="row">
          <div className={"mt-5 col-4"}>
            <h3 className={"text-white"}>Search needed info</h3>
            <form>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp"
                       placeholder="Enter name"/>
              </div>



              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
