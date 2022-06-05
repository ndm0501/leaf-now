import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import './NotFound.css'

const NotFound = () => {
    const history = useHistory();
    
    const handleNavigation = () => {
        history.push('/')
    }
    return <div className='notfound__screen'>
        <div className='not__found'>
            <h3>
                Are you lost?
            </h3>
            <div>
                <Button type="secondary" label="Go to home" onClick={handleNavigation} />
            </div>
        </div>
    
    </div>
}
export default NotFound;