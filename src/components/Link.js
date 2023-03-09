import React from 'react';

const Link = ({ link: {description, url} }) => (
    <div>
        <div>
            {description} ({url})
        </div>
    </div>
);

export default Link;
