import React, {Fragment, useState} from 'react';

function Test(props){
    const [count, setCount] = useState(0);

    const handleClick = (e) =>{
        e.preventDefault();
        const newCount = count + 1;
        setCount(newCount);
    }

    return(
        <Fragment>
            <h1>Count is <span>{count}</span></h1>
            <button onClick={handleClick}>Click me</button>
        </Fragment>
    )
}