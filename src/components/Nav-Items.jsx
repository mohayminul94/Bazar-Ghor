import React from 'react';

const NavItems = async () => {

    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    const navItem = data.map((item) => item.title);
    console.log(data);

    return (
        <div>
            {navItem.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
};

export default NavItems;