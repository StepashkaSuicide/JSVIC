import React, {ChangeEvent} from 'react';


type CheckBoxType = {
    isDone: boolean
    callBack: (isDone: boolean) => void
}

export const CheckBox = (props: CheckBoxType) => {


    const onChangeCheckedTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
        <input onChange={onChangeCheckedTitleHandler} type="checkbox" checked={props.isDone}/>
    );
};

