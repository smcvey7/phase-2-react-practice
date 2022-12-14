import React, {useState, useEffect} from "react";

function Grades({ isLoggedIn, currentUser }){
  const [received, setReceived]=useState(0)
  const [possible, setPossible]=useState(0)
  const [showGrades, setShowGrades]=useState(false)

  useEffect(()=>{
    const receivedArray = currentUser.userAssignments ? currentUser.userAssignments.map(item=>{
      if (item.isGraded) {return item.grade}
      else return null
    }) : []
    const possibleArray = currentUser.userAssignments ? currentUser.userAssignments.map(item=>{
      if (item.isGraded) {return item.worth}
      else return null
    }) : []
    setReceived(receivedArray)
    setPossible(possibleArray)
    setShowGrades(true)
  }, [])

  const assignmentEntries = currentUser.userAssignments === undefined ? <tr></tr> : currentUser.userAssignments.map(item=>{
    return <tr key={item.num}>
      <td>{item.num}</td>
      <td>{item.title}</td>
      <td>{item.isGraded ? item.grade : "-"}</td>
      <td>{item.worth}</td>
      <td>{item.isGraded ? Math.floor(item.grade/item.worth*100) : "-"}</td>
    </tr>
  })
  if (!isLoggedIn) return <p>Log in to view grades</p>
  else return(
    <div>
      <h2>Grades</h2>
      {showGrades ? 
        <div className="moduleElement">
          <table>
            <tbody>
              <tr>
                <th>Num</th>
                <th>Assigment</th>
                <th>Points received</th>
                <th>Points possible</th>
                <th>Percent</th>
              </tr>
              {assignmentEntries}
              <tr>
                <td></td>
                <td><strong>Total</strong></td>
                <td><strong>{received.reduce((previous, current)=>previous+current, 0)}</strong></td>
                <td><strong>{Math.floor(possible.reduce((previous, current)=>previous+current, 0))}</strong></td>
                <td><strong>{Math.floor(received.reduce((previous, current)=>previous+current, 0)/possible.reduce((previous, current)=>previous+current, 0)*100)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        :
        null}
      
    </div>
    
  )
}


export default Grades