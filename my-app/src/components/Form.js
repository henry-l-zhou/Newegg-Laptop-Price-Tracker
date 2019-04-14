import React from 'react';

const Form = (props) => (
    <form onSubmit={props.getLaptops}>
        <input type="text" name="laptopName" />
        <button>
            Search
        </button>
    </form>
)

export default Form;