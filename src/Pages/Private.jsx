import React, { useState, useEffect } from 'react'
import './Private.css'
import { Link } from 'react-router-dom'

const Private = () => {
    const outletElements = document.getElementsByClassName('splitRight')
	if(outletElements.length > 0){
		document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
	}    
    return (
        <div>
          
          <Link to={'/messages'}>=
              <button>Back</button>
            </Link>
            <h1>Private chat with:</h1>

            {/*Won't be a table, update to useEffect*/}
            <table>
                <tr>
                    <th>Chat Log</th>
                </tr>
                <tr>
                    <td>Sample Text</td>
                </tr>
            </table>
            {/*Sample text box, need to add action to update message to chat */}
            {/*Should use form instead for msg draft and send? */}
            <input class="draft" type='text' id='fname' name='fname' placeholder="Draft Message" className="textBox"/>
            <input className='submitButton' type='submit'/>

        </div>
      );
    };
    
    
    
    export default Private;