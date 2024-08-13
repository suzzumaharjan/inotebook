import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    var content=useContext(noteContext);
    useEffect(()=>{
        content.update();
    });
    
  return (
    <div>
      the name of user is {content.state.name} and address is {content.state.address}
    </div>
  )
}

export default About
