import React from 'react'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'

import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3">
          <FileSearch title='My Document' onFileSearch={(value) => { console.log(value) }} />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => { console.log(id) }}
            onFileDelete={(id) => { console.log('delete:' + id) }}
            onSaveEdit={(id,newTitle) => {console.log(id, newTitle)}}
          />
          <div className="row no-gutters">
            <div className="col">
              <BottomBtn
                icon={faPlus}
                text='新建'
                colorClass='btn-primary'
                onBtnClick={()=>{}}
              />
            </div>
            <div className="col">
              <BottomBtn
                icon={faFileImport}
                text='导入'
                colorClass='btn-success'
                onBtnClick={()=>{}}
              />
            </div>
          </div>
        </div>
        <div className="col-9 bg-success">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}


export default App;
