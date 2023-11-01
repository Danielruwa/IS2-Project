declare module 'react-notifications' {
    import React from "react";

    export class NotificationContainer extends React.Component<any> {}
    export class NotificationManager {
        static success(message: string, title?: string, timeOut?:number): void;
        static error(message: string, title?: string, timeout?:number): void;
        static warning(message: string, title?: string, timeout?:number): void;
    }
}