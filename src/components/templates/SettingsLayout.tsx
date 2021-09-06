
// Imports
import React, { ReactNode } from 'react';

// Define main props types
type SettingsLayoutProps = {
  children: ReactNode,
  title: string,
  icon?: ReactNode
}

const SettingsLayout : React.FunctionComponent<SettingsLayoutProps> = ({children, title, icon}) => {
  //
  // Rendering
  //
  return (
    <div className="settingsLayout">
        <div className="header">
            <span className={`title${icon ? " withIcon" : ""}`}>{title}</span>

            {icon && <div className="icon">{icon}</div>}
        </div>
        {children}
    </div>
  )
}

export default SettingsLayout