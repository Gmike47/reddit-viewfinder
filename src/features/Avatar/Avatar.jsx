import React, { useEffect, useState } from "react";
import './Avatar.css';
import defpic from './default.png'

const Avatar = (props) => {
    const { name } = props;
    const [src, setSrc] = useState([]);

    const userApi = async (name) => {
        const response = await fetch(`https://www.reddit.com/user/${name}/about.json`);
        const json = await response.json();
        const data = json.data.snoovatar_img;
        
        // apperntly not everyone has an avatar so the url you get from the api will return empty
        // in which case the if else statement will check it and assign the defpic for the src
        if (data.length > 0) {
            setSrc(data);
        } else {
            setSrc(defpic)
        }
    };

    useEffect(() => {
        userApi(name);
    },[name]);

    return (
        <img 
        src={src}
        alt={`${name} profile`}
        className="avatar-profile-image"
        />
    );
};

export default Avatar;