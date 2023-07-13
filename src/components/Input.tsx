import React, {ChangeEvent, RefObject} from 'react';

type InputType = {
    newTitle: RefObject<HTMLInputElement>

}

export const Input = (props:InputType) => {


    return (
        <input ref={props.newTitle} />
    );
};





























//
// import React, {ChangeEvent} from 'react';
//
// type InputType = {
//     title: string
//     setTitle: (title:string)=> void
// }
//
// export const Input = (props:InputType) => {
//
//     const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
//         props.setTitle(e.currentTarget.value)
//     }
//
//     return (
//         <input value={props.title} onChange={onChangeHandler}/>
//     );
// };

