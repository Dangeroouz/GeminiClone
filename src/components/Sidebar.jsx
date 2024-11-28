import React, { useState } from "react";

import plusImg from '../assets/plus_icon.png'
import messageImg from '../assets/message_icon.png'
import historyImg from '../assets/history_icon.png'
import settingsImg from '../assets/setting_icon.png'
import questionImg from '../assets/question_icon.png'
import menuImg from '../assets/menu_icon.png'

export default function Sidebar(){
    const [menu, setMenu] = useState(false)
    function handleClickMenu(){
        setMenu(!menu)
    }
    return(
        <div className="sidebar">
            <div className="sidebar-top">
                <button onClick={handleClickMenu} className="menu-sidebar">
                    <img src={menuImg} alt="" />
                </button>
                <button className="new-chat flex">
                    <img src={plusImg} alt="" />
                    {menu && <p>New Chat</p>}
                </button>
                {menu && 
                <div className="recent-promts">
                    <div className="suggested-promt flex">
                        <img src={messageImg} alt="text" />
                        <p>What's programming?</p>
                    </div>
                    <div className="suggested-promt flex">
                        <img src={messageImg} alt="text" />
                        <p>How to use API?</p>
                    </div>
                </div>}
            </div>
            <div className="sidebar-bottom">
                <div className="flex">
                    <img src={questionImg} alt="home" />
                    {menu && <p>Help</p>}
                </div>
                <div className="flex">
                    <img src={historyImg} alt="saved" />
                    {menu && <p>Activity</p>}
                </div>
                <div className="flex">
                    <img src={settingsImg} alt="rocket" />
                    {menu && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}