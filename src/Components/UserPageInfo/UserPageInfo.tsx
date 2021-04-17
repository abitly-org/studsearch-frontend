import React from "react";

interface PageInfo {
    h1: string;
    span: string;
    a: string;
    href: string
}

function UserPageInfo(props: PageInfo) {
    const {h1, span, a, href} = props;
    return (
        <div className="UserPage">
            <h1>{h1}</h1>
            <div>
                <span>{span}</span>
                <a href={href}>{a}</a>
            </div>
        </div>
    )
}

export default UserPageInfo;